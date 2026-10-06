"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryDriver = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class DeliveryDriver extends sequelize_1.Model {
}
exports.DeliveryDriver = DeliveryDriver;
DeliveryDriver.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
    modelName: "DeliveryDriver",
    tableName: "delivery_drivers",
    timestamps: true,
});
//# sourceMappingURL=delivery-driver.model.js.map