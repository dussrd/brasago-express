import { sequelize, testConnection } from "../db";
import { DEFAULT_SEED_COUNTS, resolveSeedCounts, SeedCounts } from "./counts";
import { seedBranches } from "../../features/operation/Branches/branches.seeder";
import { seedCustomers } from "../../features/sale/Customers/customers.seeder";
import { seedProducts } from "../../features/inventory/Products/products.seeder";
import { seedIngredients } from "../../features/inventory/Ingredients/ingredients.seeder";
import { seedDeliveryDrivers } from "../../features/logistic/DeliveryDrivers/delivery-drivers.seeder";
import { seedTables } from "../../features/operation/Tables/tables.seeder";
import { seedRecipeIngredients } from "../../features/inventory/RecipeIngredients/recipe-ingredients.seeder";
import { seedOrders } from "../../features/sale/Orders/orders.seeder";
import { seedOrderDetails } from "../../features/sale/OrderDetails/order-details.seeder";
import { seedReservations } from "../../features/operation/Reservations/reservations.seeder";
import { seedDeliveries } from "../../features/logistic/Deliveries/deliveries.seeder";
import { seedPayments } from "../../features/finance/Payments/payments.seeder";

// Asociaciones: todos los modelos ya están inicializados antes de este bloque.
import "../../features/finance/Payments/payments.associations";
import "../../features/inventory/Ingredients/ingredients.associations";
import "../../features/inventory/Products/products.associations";
import "../../features/inventory/RecipeIngredients/recipe-ingredients.associations";
import "../../features/logistic/Deliveries/deliveries.associations";
import "../../features/logistic/DeliveryDrivers/delivery-drivers.associations";
import "../../features/operation/Branches/branches.associations";
import "../../features/operation/Reservations/reservations.associations";
import "../../features/operation/Tables/tables.associations";
import "../../features/sale/Customers/customers.associations";
import "../../features/sale/OrderDetails/order-details.associations";
import "../../features/sale/Orders/orders.associations";

/**
 * Ejecuta los 12 seeders en orden de dependencias, fuera de la App.
 *
 * Uso: npx ts-node src/database/seeders/index.ts --customers=20
 * También acepta variables como SEED_CUSTOMERS=5.
 */
export async function runAllSeeders(counts: Partial<SeedCounts> = resolveSeedCounts()): Promise<void> {
  for (const [feature, count] of Object.entries(counts)) {
    if (count !== undefined && (!Number.isSafeInteger(count) || count < 0)) {
      throw new Error(`Cantidad inválida para ${feature}: ${count}`);
    }
  }

  console.log("🌱 Iniciando SeedersRunner...");
  console.log("📊 Conteos:", counts);
  if (!(await testConnection())) {
    throw new Error("No hay conexión a la base de datos");
  }

  await sequelize.sync({ force: false });

  // Primero padres; después los registros que dependen de ellos.
  await seedBranches(counts.branches ?? DEFAULT_SEED_COUNTS.branches);
  await seedCustomers(counts.customers ?? DEFAULT_SEED_COUNTS.customers);
  await seedProducts(counts.products ?? DEFAULT_SEED_COUNTS.products);
  await seedIngredients(counts.ingredients ?? DEFAULT_SEED_COUNTS.ingredients);
  await seedDeliveryDrivers(counts.deliveryDrivers ?? DEFAULT_SEED_COUNTS.deliveryDrivers);
  await seedTables(counts.tables ?? DEFAULT_SEED_COUNTS.tables);
  await seedRecipeIngredients(counts.recipeIngredients ?? DEFAULT_SEED_COUNTS.recipeIngredients);
  await seedOrders(counts.orders ?? DEFAULT_SEED_COUNTS.orders);
  await seedOrderDetails(counts.orderDetails ?? DEFAULT_SEED_COUNTS.orderDetails);
  await seedReservations(counts.reservations ?? DEFAULT_SEED_COUNTS.reservations);
  await seedDeliveries(counts.deliveries ?? DEFAULT_SEED_COUNTS.deliveries);
  await seedPayments(counts.payments ?? DEFAULT_SEED_COUNTS.payments);

  console.log("🌱 SeedersRunner finalizado");
}

if (require.main === module) {
  runAllSeeders()
    .catch((error: unknown) => {
      console.error("❌ Error en seeders:", error);
      process.exitCode = 1;
    })
    .finally(async () => {
      try {
        await sequelize.close();
      } catch (error) {
        console.error("❌ Error al cerrar la conexión:", error);
        process.exitCode = 1;
      }
    });
}
