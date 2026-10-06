"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedIngredients = seedIngredients;
const faker_1 = require("@faker-js/faker");
const ingredient_model_1 = require("./ingredient.model");
/**
 * Seeder del feature Ingredients (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
async function seedIngredients(count) {
    if (count <= 0) {
        console.log("⏭️  ingredients: count=0, se omite");
        return 0;
    }
    const existing = await ingredient_model_1.Ingredient.count();
    if (existing > 0) {
        console.log(`⏭️  ingredients: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const rows = Array.from({ length: count }, (_, i) => ({
        code: `ING-${i}-${faker_1.faker.string.alphanumeric(6)}`,
        name: faker_1.faker.commerce.productName(),
        unitOfMeasure: faker_1.faker.helpers.arrayElement(["kg", "g", "l", "ml", "unit"]),
        minimumStock: faker_1.faker.number.int({ min: 1, max: 20 }),
        status: "active",
    }));
    await ingredient_model_1.Ingredient.bulkCreate(rows);
    console.log(`✅ ingredients: insertados ${rows.length} registro(s) falsos`);
    return rows.length;
}
//# sourceMappingURL=ingredients.seeder.js.map