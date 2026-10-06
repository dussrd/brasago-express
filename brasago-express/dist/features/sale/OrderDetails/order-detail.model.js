"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetail = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class OrderDetail extends sequelize_1.Model {
}
exports.OrderDetail = OrderDetail;
OrderDetail.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "order_id",
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "product_id",
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    unitValue: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        allowNull: false,
        field: "unit_value",
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
    modelName: "OrderDetail",
    tableName: "order_details",
    timestamps: true,
});
//# sourceMappingURL=order-detail.model.js.map