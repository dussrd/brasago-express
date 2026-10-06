"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = require("./product.model");
const order_detail_model_1 = require("../../sale/OrderDetails/order-detail.model");
const recipe_ingredient_model_1 = require("../RecipeIngredients/recipe-ingredient.model");
/** Relaciones del modelo Product. Se cargan después de inicializar todos los modelos. */
product_model_1.Product.hasMany(order_detail_model_1.OrderDetail, { foreignKey: "productId", as: "orderDetails" });
product_model_1.Product.hasMany(recipe_ingredient_model_1.RecipeIngredient, { foreignKey: "productId", as: "recipeIngredients" });
//# sourceMappingURL=products.associations.js.map