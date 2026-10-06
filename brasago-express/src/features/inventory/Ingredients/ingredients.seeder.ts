import { faker } from "@faker-js/faker";
import { Ingredient } from "./ingredient.model";

/**
 * Seeder del feature Ingredients (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
export async function seedIngredients(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  ingredients: count=0, se omite");
    return 0;
  }

  const existing = await Ingredient.count();
  if (existing > 0) {
    console.log(`⏭️  ingredients: ya hay ${existing} registro(s), se omite seeder`);
    return 0;
  }

  const rows = Array.from({ length: count }, (_, i) => ({
    code: `ING-${i}-${faker.string.alphanumeric(6)}`,
    name: faker.commerce.productName(),
    unitOfMeasure: faker.helpers.arrayElement(["kg", "g", "l", "ml", "unit"]),
    minimumStock: faker.number.int({ min: 1, max: 20 }),
    status: "active" as const,
  }));

  await Ingredient.bulkCreate(rows);
  console.log(`✅ ingredients: insertados ${rows.length} registro(s) falsos`);
  return rows.length;
}
