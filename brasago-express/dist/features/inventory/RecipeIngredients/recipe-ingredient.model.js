"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeIngredient = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class RecipeIngredient extends sequelize_1.Model {
}
exports.RecipeIngredient = RecipeIngredient;
RecipeIngredient.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "product_id",
    },
    ingredientId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "ingredient_id",
    },
    quantity: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive"),
        defaultValue: "inactive",
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "RecipeIngredient",
    tableName: "recipe_ingredients",
    timestamps: true,
});
//# sourceMappingURL=recipe-ingredient.model.js.map