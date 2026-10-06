import { RecipeIngredient } from "./recipe-ingredient.model";
import { Ingredient } from "../Ingredients/ingredient.model";
import { Product } from "../Products/product.model";

/** Relaciones del modelo RecipeIngredient. Se cargan después de inicializar todos los modelos. */
RecipeIngredient.belongsTo(Product, { foreignKey: "productId", as: "product" });
RecipeIngredient.belongsTo(Ingredient, { foreignKey: "ingredientId", as: "ingredient" });
