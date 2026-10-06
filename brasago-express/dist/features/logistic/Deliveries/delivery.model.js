"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delivery = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Delivery extends sequelize_1.Model {
}
exports.Delivery = Delivery;
Delivery.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        field: "order_id",
    },
    deliveryDriverId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "delivery_driver_id",
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: "start_date",
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        field: "end_date",
    },
    total: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive"),
        defaultValue: "inactive",
        allowNull: false,
    },
    observations: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Delivery",
    tableName: "deliveries",
    timestamps: true,
});
//# sourceMappingURL=delivery.model.js.map