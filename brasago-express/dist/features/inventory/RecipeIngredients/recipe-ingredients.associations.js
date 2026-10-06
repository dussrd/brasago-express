"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recipe_ingredient_model_1 = require("./recipe-ingredient.model");
const ingredient_model_1 = require("../Ingredients/ingredient.model");
const product_model_1 = require("../Products/product.model");
/** Relaciones del modelo RecipeIngredient. Se cargan después de inicializar todos los modelos. */
recipe_ingredient_model_1.RecipeIngredient.belongsTo(product_model_1.Product, { foreignKey: "productId", as: "product" });
recipe_ingredient_model_1.RecipeIngredient.belongsTo(ingredient_model_1.Ingredient, { foreignKey: "ingredientId", as: "ingredient" });
//# sourceMappingURL=recipe-ingredients.associations.js.map