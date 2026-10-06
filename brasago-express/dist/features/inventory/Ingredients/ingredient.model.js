"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingredient = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Ingredient extends sequelize_1.Model {
}
exports.Ingredient = Ingredient;
Ingredient.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    unitOfMeasure: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: "unit_of_measure",
    },
    minimumStock: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        allowNull: false,
        field: "minimum_stock",
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive"),
        defaultValue: "inactive",
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Ingredient",
    tableName: "ingredients",
    timestamps: true,
});
//# sourceMappingURL=ingredient.model.js.map