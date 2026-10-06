"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ingredient_model_1 = require("./ingredient.model");
const recipe_ingredient_model_1 = require("../RecipeIngredients/recipe-ingredient.model");
/** Relaciones del modelo Ingredient. Se cargan después de inicializar todos los modelos. */
ingredient_model_1.Ingredient.hasMany(recipe_ingredient_model_1.RecipeIngredient, { foreignKey: "ingredientId", as: "recipeIngredients" });
//# sourceMappingURL=ingredients.associations.js.map