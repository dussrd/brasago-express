"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Table extends sequelize_1.Model {
}
exports.Table = Table;
Table.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    branchId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "branch_id",
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive"),
        defaultValue: "inactive",
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Table",
    tableName: "tables",
    timestamps: true,
});
//# sourceMappingURL=table.model.js.map