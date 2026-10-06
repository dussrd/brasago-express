import dotenv from "dotenv";
import express, { Application, ErrorRequestHandler } from "express";
import morgan from "morgan";
var cors = require("cors");
import { sequelize, getDatabaseInfo, testConnection } from "../database/db";
import "../features/finance/Payments/payment.model";
import "../features/inventory/Ingredients/ingredient.model";
import "../features/inventory/Products/product.model";
import "../features/inventory/RecipeIngredients/recipe-ingredient.model";
import "../features/logistic/Deliveries/delivery.model";
import "../features/logistic/DeliveryDrivers/delivery-driver.model";
import "../features/operation/Branches/branch.model";
import "../features/operation/Reservations/reservation.model";
import "../features/operation/Tables/table.model";
import "../features/sale/Customers/customer.model";
import "../features/sale/Orders/order.model";
import "../features/sale/OrderDetails/order-detail.model";
import { Routes } from "../routes/index";

// Fase II — Auth con RBAC: primero los seis modelos, después las asociaciones
// (las asociaciones referencian los modelos, no al revés).
/* import "../features/auth/users/user.model";
import "../features/auth/roles/role.model";
import "../features/auth/resources/resource.model";
import "../features/auth/role-users/role-user.model";
import "../features/auth/resource-roles/resource-role.model";
import "../features/auth/refresh-tokens/refresh-token.model";
import "../features/auth/rbac.associations"; */

import { setupSwagger } from "../swagger/index";

// Asociaciones: todos los modelos ya están inicializados antes de este bloque.
import "../features/finance/Payments/payments.associations";
import "../features/inventory/Ingredients/ingredients.associations";
import "../features/inventory/Products/products.associations";
import "../features/inventory/RecipeIngredients/recipe-ingredients.associations";
import "../features/logistic/Deliveries/deliveries.associations";
import "../features/logistic/DeliveryDrivers/delivery-drivers.associations";
import "../features/operation/Branches/branches.associations";
import "../features/operation/Reservations/reservations.associations";
import "../features/operation/Tables/tables.associations";
import "../features/sale/Customers/customers.associations";
import "../features/sale/OrderDetails/order-details.associations";
import "../features/sale/Orders/orders.associations";

dotenv.config();

export class App {
  public app: Application;
  public routePrv: Routes = new Routes();

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
    this.docs();
    this.errorHandling();
  }

  private settings(): void {
    this.app.set("port", this.port || process.env.PORT || 4000);
  }

  private middlewares(): void {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes(): void {
    // Fase I — Business (cada operación, modalidad JWT + RBAC)
    this.routePrv.productsRoutes.routes(this.app);
    this.routePrv.recipeIngredientsRoutes.routes(this.app);
    this.routePrv.deliveriesRoutes.routes(this.app);
    this.routePrv.deliveryDriversRoutes.routes(this.app);
    this.routePrv.branchesRoutes.routes(this.app);
    this.routePrv.reservationsRoutes.routes(this.app);
    this.routePrv.tablesRoutes.routes(this.app);
    this.routePrv.customersRoutes.routes(this.app);
    this.routePrv.orderDetailsRoutes.routes(this.app);
    this.routePrv.ordersRoutes.routes(this.app);
    this.routePrv.paymentsRoutes.routes(this.app);
    this.routePrv.ingredientsRoutes.routes(this.app);

    // Fase II — Auth con RBAC
    // `sessionRoutes` registra los endpoints OPEN/JWT (login, refresh, logout,
    // perfil, permisos); el resto son modalidad JWT + RBAC.
    /*     this.routePrv.sessionRoutes.routes(this.app);
    this.routePrv.refreshTokensRoutes.routes(this.app);
    this.routePrv.usersRoutes.routes(this.app);
    this.routePrv.rolesRoutes.routes(this.app);
    this.routePrv.resourcesRoutes.routes(this.app);
    this.routePrv.roleUsersRoutes.routes(this.app);
    this.routePrv.resourceRolesRoutes.routes(this.app); */
  }

  private docs(): void {
    setupSwagger(this.app);
  }

  /**
   * Errores que ocurren **antes** de llegar a un controller o middleware.
   *
   * El caso típico es un cuerpo JSON malformado: `express.json()` lanza un
   * `SyntaxError` que, sin manejador, cae en el de Express por defecto y responde
   * 400 con un HTML que incluye el **stack trace y rutas absolutas del servidor**
   * (fuga de información). Aquí se traduce a un 400 JSON limpio.
   *
   * Debe registrarse **después** de las rutas: Express reconoce un middleware de
   * error por su aridad de 4 argumentos.
   */
  private errorHandling(): void {
    const bodyErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
      if (err instanceof SyntaxError && "body" in err) {
        res.status(400).json({ error: "Malformed JSON body" });
        return;
      }
      next(err);
    };
    this.app.use(bodyErrorHandler);
  }

  private async dbConnection(): Promise<void> {
    try {
      // Mostrar información de la base de datos seleccionada
      const dbInfo = getDatabaseInfo();
      console.log(`🔗 Intentando conectar a: ${dbInfo.engine.toUpperCase()}`);

      // Probar la conexión
      const isConnected = await testConnection();

      if (!isConnected) {
        throw new Error(
          `No se pudo conectar a la base de datos ${dbInfo.engine.toUpperCase()}`,
        );
      }

      // alter: true actualiza columnas faltantes (ej. createdAt/updatedAt tras timestamps: true).
      // force: false no recrea tablas; no borra datos. En producción preferir migraciones.
      await sequelize.sync({ force: false, alter: true });
      console.log(`📦 Base de datos sincronizada exitosamente`);
    } catch (error) {
      console.error("❌ Error al conectar con la base de datos:", error);
      process.exit(1); // Terminar la aplicación si no se puede conectar
    }
  }

  async listen() {
    // Orden de arranque: primero la BD (conexión + `sync`), después abrir el puerto.
    // Si se abre el puerto antes de terminar `sync({ alter: true })`, las sentencias
    // DDL (ALTER TABLE, DROP/ADD FOREIGN KEY) compiten con las peticiones que ya
    // están entrando y provocan deadlocks y errores de FK intermitentes.
    await this.dbConnection();
    await this.app.listen(this.app.get("port"));
    console.log(`🚀 Servidor ejecutándose en puerto ${this.app.get("port")}`);
  }
}
