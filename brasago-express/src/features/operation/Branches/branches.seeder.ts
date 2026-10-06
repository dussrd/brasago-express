import { faker } from "@faker-js/faker";
import { Branch } from "./branch.model";

/**
 * Seeder del feature Branches (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
export async function seedBranches(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  branches: count=0, se omite");
    return 0;
  }

  const existing = await Branch.count();
  if (existing > 0) {
    console.log(`⏭️  branches: ya hay ${existing} registro(s), se omite seeder`);
    return 0;
  }

  const rows = Array.from({ length: count }, (_, i) => ({
    name: faker.company.name(),
    description: faker.location.streetAddress(),
    status: "active" as const,
  }));

  await Branch.bulkCreate(rows);
  console.log(`✅ branches: insertados ${rows.length} registro(s) falsos`);
  return rows.length;
}
