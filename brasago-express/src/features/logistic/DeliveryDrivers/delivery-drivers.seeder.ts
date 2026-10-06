import { faker } from "@faker-js/faker";
import { DeliveryDriver } from "./delivery-driver.model";

/**
 * Seeder del feature DeliveryDrivers (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
export async function seedDeliveryDrivers(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  delivery-drivers: count=0, se omite");
    return 0;
  }

  const existing = await DeliveryDriver.count();
  if (existing > 0) {
    console.log(`⏭️  delivery-drivers: ya hay ${existing} registro(s), se omite seeder`);
    return 0;
  }

  const rows = Array.from({ length: count }, (_, i) => ({
    name: faker.person.fullName(),
    description: faker.lorem.sentence(),
    status: "active" as const,
  }));

  await DeliveryDriver.bulkCreate(rows);
  console.log(`✅ delivery-drivers: insertados ${rows.length} registro(s) falsos`);
  return rows.length;
}
