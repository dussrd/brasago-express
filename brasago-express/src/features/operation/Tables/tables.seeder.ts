import { faker } from "@faker-js/faker";
import { Table } from "./table.model";
import { Branch } from "../Branches/branch.model";

/**
 * Seeder del feature Tables (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
export async function seedTables(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  tables: count=0, se omite");
    return 0;
  }

  const existing = await Table.count();
  if (existing > 0) {
    console.log(`⏭️  tables: ya hay ${existing} registro(s), se omite seeder`);
    return 0;
  }

  const branches = await Branch.findAll();
  if (branches.length === 0) {
    console.log("⏭️  tables: faltan registros relacionados, se omite seeder");
    return 0;
  }

  const rows = Array.from({ length: count }, (_, i) => ({
    branchId: faker.helpers.arrayElement(branches).id,
    name: `Mesa ${i + 1}`,
    description: faker.lorem.sentence(),
    status: "active" as const,
  }));

  await Table.bulkCreate(rows);
  console.log(`✅ tables: insertados ${rows.length} registro(s) falsos`);
  return rows.length;
}
