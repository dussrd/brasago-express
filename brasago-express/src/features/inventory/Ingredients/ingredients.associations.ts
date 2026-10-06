import { Ingredient } from "./ingredient.model";
import { RecipeIngredient } from "../RecipeIngredients/recipe-ingredient.model";

/** Relaciones del modelo Ingredient. Se cargan después de inicializar todos los modelos. */
Ingredient.hasMany(RecipeIngredient, { foreignKey: "ingredientId", as: "recipeIngredients" });
