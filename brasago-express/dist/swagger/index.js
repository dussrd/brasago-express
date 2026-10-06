"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOpenApiDocument = buildOpenApiDocument;
exports.setupSwagger = setupSwagger;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const payments_swagger_1 = require("../features/finance/Payments/payments.swagger");
const ingredients_swagger_1 = require("../features/inventory/Ingredients/ingredients.swagger");
const products_swagger_1 = require("../features/inventory/Products/products.swagger");
const recipe_ingredients_swagger_1 = require("../features/inventory/RecipeIngredients/recipe-ingredients.swagger");
const deliveries_swagger_1 = require("../features/logistic/Deliveries/deliveries.swagger");
const delivery_drivers_swagger_1 = require("../features/logistic/DeliveryDrivers/delivery-drivers.swagger");
const branches_swagger_1 = require("../features/operation/Branches/branches.swagger");
const reservations_swagger_1 = require("../features/operation/Reservations/reservations.swagger");
const tables_swagger_1 = require("../features/operation/Tables/tables.swagger");
const customers_swagger_1 = require("../features/sale/Customers/customers.swagger");
const order_details_swagger_1 = require("../features/sale/OrderDetails/order-details.swagger");
const orders_swagger_1 = require("../features/sale/Orders/orders.swagger");
/**
 * Registry externo: importa la documentación OpenAPI de cada feature
 * (mismo patrón que SeedersRunner).
 */
const featureSwaggerModules = [
    payments_swagger_1.paymentsSwagger,
    ingredients_swagger_1.ingredientsSwagger,
    products_swagger_1.productsSwagger,
    recipe_ingredients_swagger_1.recipeIngredientsSwagger,
    deliveries_swagger_1.deliveriesSwagger,
    delivery_drivers_swagger_1.deliveryDriversSwagger,
    branches_swagger_1.branchesSwagger,
    reservations_swagger_1.reservationsSwagger,
    tables_swagger_1.tablesSwagger,
    customers_swagger_1.customersSwagger,
    order_details_swagger_1.orderDetailsSwagger,
    orders_swagger_1.ordersSwagger,
];
function buildOpenApiDocument() {
    const tags = [];
    const paths = {};
    const schemas = {};
    const securitySchemes = {};
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
            description: "API Brasago Express (Express + Sequelize): ventas, inventario, operaciones, logística y finanzas. La documentación declara JWT + RBAC por operación; requiere los middlewares correspondientes en las rutas.",
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
function setupSwagger(app) {
    const document = buildOpenApiDocument();
    app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(document));
    app.get("/api/docs.json", (_req, res) => {
        res.json(document);
    });
    console.log("📘 Swagger UI: /api/docs  |  OpenAPI JSON: /api/docs.json");
}
//# sourceMappingURL=index.js.map