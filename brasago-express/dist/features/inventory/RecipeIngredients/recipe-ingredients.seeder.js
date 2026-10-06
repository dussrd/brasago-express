"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRecipeIngredients = seedRecipeIngredients;
const faker_1 = require("@faker-js/faker");
const recipe_ingredient_model_1 = require("./recipe-ingredient.model");
const product_model_1 = require("../Products/product.model");
const ingredient_model_1 = require("../Ingredients/ingredient.model");
/**
 * Seeder del feature RecipeIngredients (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
async function seedRecipeIngredients(count) {
    if (count <= 0) {
        console.log("⏭️  recipe-ingredients: count=0, se omite");
        return 0;
    }
    const existing = await recipe_ingredient_model_1.RecipeIngredient.count();
    if (existing > 0) {
        console.log(`⏭️  recipe-ingredients: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const products = await product_model_1.Product.findAll();
    const ingredients = await ingredient_model_1.Ingredient.findAll();
    if (products.length === 0 || ingredients.length === 0) {
        console.log("⏭️  recipe-ingredients: faltan registros relacionados, se omite seeder");
        return 0;
    }
    const rows = Array.from({ length: count }, (_, i) => ({
        productId: faker_1.faker.helpers.arrayElement(products).id,
        ingredientId: faker_1.faker.helpers.arrayElement(ingredients).id,
        quantity: faker_1.faker.number.float({ min: 0.01, max: 2, fractionDigits: 2 }),
        status: "active",
    }));
    await recipe_ingredient_model_1.RecipeIngredient.bulkCreate(rows);
    console.log(`✅ recipe-ingredients: insertados ${rows.length} registro(s) falsos`);
    return rows.length;
}
//# sourceMappingURL=recipe-ingredients.seeder.js.map