import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import { paymentsSwagger } from "../features/finance/Payments/payments.swagger";
import { ingredientsSwagger } from "../features/inventory/Ingredients/ingredients.swagger";
import { productsSwagger } from "../features/inventory/Products/products.swagger";
import { recipeIngredientsSwagger } from "../features/inventory/RecipeIngredients/recipe-ingredients.swagger";
import { deliveriesSwagger } from "../features/logistic/Deliveries/deliveries.swagger";
import { deliveryDriversSwagger } from "../features/logistic/DeliveryDrivers/delivery-drivers.swagger";
import { branchesSwagger } from "../features/operation/Branches/branches.swagger";
import { reservationsSwagger } from "../features/operation/Reservations/reservations.swagger";
import { tablesSwagger } from "../features/operation/Tables/tables.swagger";
import { customersSwagger } from "../features/sale/Customers/customers.swagger";
import { orderDetailsSwagger } from "../features/sale/OrderDetails/order-details.swagger";
import { ordersSwagger } from "../features/sale/Orders/orders.swagger";

export type FeatureSwaggerModule = {
  tags: unknown[];
  paths: Record<string, unknown>;
  components?: {
    schemas?: Record<string, unknown>;
    securitySchemes?: Record<string, unknown>;
  };
};

/**
 * Registry externo: importa la documentación OpenAPI de cada feature
 * (mismo patrón que SeedersRunner).
 */
const featureSwaggerModules: FeatureSwaggerModule[] = [
  paymentsSwagger,
  ingredientsSwagger,
  productsSwagger,
  recipeIngredientsSwagger,
  deliveriesSwagger,
  deliveryDriversSwagger,
  branchesSwagger,
  reservationsSwagger,
  tablesSwagger,
  customersSwagger,
  orderDetailsSwagger,
  ordersSwagger,
];

export function buildOpenApiDocument() {
  const tags: unknown[] = [];
  const paths: Record<string, unknown> = {};
  const schemas: Record<string, unknown> = {};
  const securitySchemes: Record<string, unknown> = {};

  for (const mod of featureSwaggerModules) {
    tags.push(...mod.tags);
    Object.assign(paths, mod.paths);
    if (mod.components?.securitySchemes) {
      Object.assign(securitySchemes, mod.components.securitySchemes);
    }
    if (mod.components?.schemas) {
      Object.assign(schemas, mod.components.schemas);
    }
  }

  return {
    openapi: "3.0.3",
    info: {
      title: "Brasago Express API",
      version: "1.0.0",
      description:
        "API Brasago Express (Express + Sequelize): ventas, inventario, operaciones, logística y finanzas. La documentación declara JWT + RBAC por operación; requiere los middlewares correspondientes en las rutas.",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 4000}`,
        description: "Local",
      },
    ],
    tags,
    paths,
    components: { schemas, securitySchemes },
  };
}

/** Monta Swagger UI y el JSON OpenAPI */
export function setupSwagger(app: Application): void {
  const document = buildOpenApiDocument();
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(document));
  app.get("/api/docs.json", (_req, res) => {
    res.json(document);
  });
  console.log("📘 Swagger UI: /api/docs  |  OpenAPI JSON: /api/docs.json");
}