import { faker } from "@faker-js/faker";
import { RecipeIngredient } from "./recipe-ingredient.model";
import { Product } from "../Products/product.model";
import { Ingredient } from "../Ingredients/ingredient.model";

/**
 * Seeder del feature RecipeIngredients (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
export async function seedRecipeIngredients(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  recipe-ingredients: count=0, se omite");
    return 0;
  }

  const existing = await RecipeIngredient.count();
  if (existing > 0) {
    console.log(`⏭️  recipe-ingredients: ya hay ${existing} registro(s), se omite seeder`);
    return 0;
  }

  const products = await Product.findAll();
  const ingredients = await Ingredient.findAll();
  if (products.length === 0 || ingredients.length === 0) {
    console.log("⏭️  recipe-ingredients: faltan registros relacionados, se omite seeder");
    return 0;
  }

  const rows = Array.from({ length: count }, (_, i) => ({
    productId: faker.helpers.arrayElement(products).id,
    ingredientId: faker.helpers.arrayElement(ingredients).id,
    quantity: faker.number.float({ min: 0.01, max: 2, fractionDigits: 2 }),
    status: "active" as const,
  }));

  await RecipeIngredient.bulkCreate(rows);
  console.log(`✅ recipe-ingredients: insertados ${rows.length} registro(s) falsos`);
  return rows.length;
}
