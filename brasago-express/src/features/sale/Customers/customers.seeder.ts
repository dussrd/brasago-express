import { faker } from "@faker-js/faker";
import { Customer } from "./customer.model";

/**
 * Seeder del feature Customers (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
export async function seedCustomers(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  customers: count=0, se omite");
    return 0;
  }

  const existing = await Customer.count();
  if (existing > 0) {
    console.log(`⏭️  customers: ya hay ${existing} registro(s), se omite seeder`);
    return 0;
  }

  const rows = Array.from({ length: count }, (_, i) => ({
    documentType: "CC",
    documentNumber: `${i + 1}${faker.string.numeric(10)}`,
    name: faker.person.fullName(),
    phone: faker.phone.number({ style: "national" }),
    email: `customer.${i}.${faker.string.alphanumeric(6)}@example.com`.toLowerCase(),
    status: "active" as const,
  }));

  await Customer.bulkCreate(rows);
  console.log(`✅ customers: insertados ${rows.length} registro(s) falsos`);
  return rows.length;
}
