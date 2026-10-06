"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
var cors = require("cors");
const db_1 = require("../database/db");
require("../features/finance/Payments/payment.model");
require("../features/inventory/Ingredients/ingredient.model");
require("../features/inventory/Products/product.model");
require("../features/inventory/RecipeIngredients/recipe-ingredient.model");
require("../features/logistic/Deliveries/delivery.model");
require("../features/logistic/DeliveryDrivers/delivery-driver.model");
require("../features/operation/Branches/branch.model");
require("../features/operation/Reservations/reservation.model");
require("../features/operation/Tables/table.model");
require("../features/sale/Customers/customer.model");
require("../features/sale/Orders/order.model");
require("../features/sale/OrderDetails/order-detail.model");
const index_1 = require("../routes/index");
// Fase II — Auth con RBAC: primero los seis modelos, después las asociaciones
// (las asociaciones referencian los modelos, no al revés).
/* import "../features/auth/users/user.model";
import "../features/auth/roles/role.model";
import "../features/auth/resources/resource.model";
import "../features/auth/role-users/role-user.model";
import "../features/auth/resource-roles/resource-role.model";
import "../features/auth/refresh-tokens/refresh-token.model";
import "../features/auth/rbac.associations"; */
const index_2 = require("../swagger/index");
// Asociaciones: todos los modelos ya están inicializados antes de este bloque.
require("../features/finance/Payments/payments.associations");
require("../features/inventory/Ingredients/ingredients.associations");
require("../features/inventory/Products/products.associations");
require("../features/inventory/RecipeIngredients/recipe-ingredients.associations");
require("../features/logistic/Deliveries/deliveries.associations");
require("../features/logistic/DeliveryDrivers/delivery-drivers.associations");
require("../features/operation/Branches/branches.associations");
require("../features/operation/Reservations/reservations.associations");
require("../features/operation/Tables/tables.associations");
require("../features/sale/Customers/customers.associations");
require("../features/sale/OrderDetails/order-details.associations");
require("../features/sale/Orders/orders.associations");
dotenv_1.default.config();
class App {
    constructor(port) {
        this.port = port;
        this.routePrv = new index_1.Routes();
        this.app = (0, express_1.default)();
        this.settings();
        this.middlewares();
        this.routes();
        this.docs();
        this.errorHandling();
    }
    settings() {
        this.app.set("port", this.port || process.env.PORT || 4000);
    }
    middlewares() {
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(cors());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
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
    docs() {
        (0, index_2.setupSwagger)(this.app);
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
    errorHandling() {
        const bodyErrorHandler = (err, _req, res, next) => {
            if (err instanceof SyntaxError && "body" in err) {
                res.status(400).json({ error: "Malformed JSON body" });
                return;
            }
            next(err);
        };
        this.app.use(bodyErrorHandler);
    }
    async dbConnection() {
        try {
            // Mostrar información de la base de datos seleccionada
            const dbInfo = (0, db_1.getDatabaseInfo)();
            console.log(`🔗 Intentando conectar a: ${dbInfo.engine.toUpperCase()}`);
            // Probar la conexión
            const isConnected = await (0, db_1.testConnection)();
            if (!isConnected) {
                throw new Error(`No se pudo conectar a la base de datos ${dbInfo.engine.toUpperCase()}`);
            }
            // alter: true actualiza columnas faltantes (ej. createdAt/updatedAt tras timestamps: true).
            // force: false no recrea tablas; no borra datos. En producción preferir migraciones.
            await db_1.sequelize.sync({ force: false, alter: true });
            console.log(`📦 Base de datos sincronizada exitosamente`);
        }
        catch (error) {
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
exports.App = App;
//# sourceMappingURL=index.js.map