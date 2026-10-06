import { Product } from "./product.model";
import { OrderDetail } from "../../sale/OrderDetails/order-detail.model";
import { RecipeIngredient } from "../RecipeIngredients/recipe-ingredient.model";

/** Relaciones del modelo Product. Se cargan después de inicializar todos los modelos. */
Product.hasMany(OrderDetail, { foreignKey: "productId", as: "orderDetails" });
Product.hasMany(RecipeIngredient, { foreignKey: "productId", as: "recipeIngredients" });
