"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAllSeeders = runAllSeeders;
const db_1 = require("../db");
const counts_1 = require("./counts");
const branches_seeder_1 = require("../../features/operation/Branches/branches.seeder");
const customers_seeder_1 = require("../../features/sale/Customers/customers.seeder");
const products_seeder_1 = require("../../features/inventory/Products/products.seeder");
const ingredients_seeder_1 = require("../../features/inventory/Ingredients/ingredients.seeder");
const delivery_drivers_seeder_1 = require("../../features/logistic/DeliveryDrivers/delivery-drivers.seeder");
const tables_seeder_1 = require("../../features/operation/Tables/tables.seeder");
const recipe_ingredients_seeder_1 = require("../../features/inventory/RecipeIngredients/recipe-ingredients.seeder");
const orders_seeder_1 = require("../../features/sale/Orders/orders.seeder");
const order_details_seeder_1 = require("../../features/sale/OrderDetails/order-details.seeder");
const reservations_seeder_1 = require("../../features/operation/Reservations/reservations.seeder");
const deliveries_seeder_1 = require("../../features/logistic/Deliveries/deliveries.seeder");
const payments_seeder_1 = require("../../features/finance/Payments/payments.seeder");
// Asociaciones: todos los modelos ya están inicializados antes de este bloque.
require("../../features/finance/Payments/payments.associations");
require("../../features/inventory/Ingredients/ingredients.associations");
require("../../features/inventory/Products/products.associations");
require("../../features/inventory/RecipeIngredients/recipe-ingredients.associations");
require("../../features/logistic/Deliveries/deliveries.associations");
require("../../features/logistic/DeliveryDrivers/delivery-drivers.associations");
require("../../features/operation/Branches/branches.associations");
require("../../features/operation/Reservations/reservations.associations");
require("../../features/operation/Tables/tables.associations");
require("../../features/sale/Customers/customers.associations");
require("../../features/sale/OrderDetails/order-details.associations");
require("../../features/sale/Orders/orders.associations");
/**
 * Ejecuta los 12 seeders en orden de dependencias, fuera de la App.
 *
 * Uso: npx ts-node src/database/seeders/index.ts --customers=20
 * También acepta variables como SEED_CUSTOMERS=5.
 */
async function runAllSeeders(counts = (0, counts_1.resolveSeedCounts)()) {
    for (const [feature, count] of Object.entries(counts)) {
        if (count !== undefined && (!Number.isSafeInteger(count) || count < 0)) {
            throw new Error(`Cantidad inválida para ${feature}: ${count}`);
        }
    }
    console.log("🌱 Iniciando SeedersRunner...");
    console.log("📊 Conteos:", counts);
    if (!(await (0, db_1.testConnection)())) {
        throw new Error("No hay conexión a la base de datos");
    }
    await db_1.sequelize.sync({ force: false });
    // Primero padres; después los registros que dependen de ellos.
    await (0, branches_seeder_1.seedBranches)(counts.branches ?? counts_1.DEFAULT_SEED_COUNTS.branches);
    await (0, customers_seeder_1.seedCustomers)(counts.customers ?? counts_1.DEFAULT_SEED_COUNTS.customers);
    await (0, products_seeder_1.seedProducts)(counts.products ?? counts_1.DEFAULT_SEED_COUNTS.products);
    await (0, ingredients_seeder_1.seedIngredients)(counts.ingredients ?? counts_1.DEFAULT_SEED_COUNTS.ingredients);
    await (0, delivery_drivers_seeder_1.seedDeliveryDrivers)(counts.deliveryDrivers ?? counts_1.DEFAULT_SEED_COUNTS.deliveryDrivers);
    await (0, tables_seeder_1.seedTables)(counts.tables ?? counts_1.DEFAULT_SEED_COUNTS.tables);
    await (0, recipe_ingredients_seeder_1.seedRecipeIngredients)(counts.recipeIngredients ?? counts_1.DEFAULT_SEED_COUNTS.recipeIngredients);
    await (0, orders_seeder_1.seedOrders)(counts.orders ?? counts_1.DEFAULT_SEED_COUNTS.orders);
    await (0, order_details_seeder_1.seedOrderDetails)(counts.orderDetails ?? counts_1.DEFAULT_SEED_COUNTS.orderDetails);
    await (0, reservations_seeder_1.seedReservations)(counts.reservations ?? counts_1.DEFAULT_SEED_COUNTS.reservations);
    await (0, deliveries_seeder_1.seedDeliveries)(counts.deliveries ?? counts_1.DEFAULT_SEED_COUNTS.deliveries);
    await (0, payments_seeder_1.seedPayments)(counts.payments ?? counts_1.DEFAULT_SEED_COUNTS.payments);
    console.log("🌱 SeedersRunner finalizado");
}
if (require.main === module) {
    runAllSeeders()
        .catch((error) => {
        console.error("❌ Error en seeders:", error);
        process.exitCode = 1;
    })
        .finally(async () => {
        try {
            await db_1.sequelize.close();
        }
        catch (error) {
            console.error("❌ Error al cerrar la conexión:", error);
            process.exitCode = 1;
        }
    });
}
//# sourceMappingURL=index.js.map