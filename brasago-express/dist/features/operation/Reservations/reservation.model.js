"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Reservation extends sequelize_1.Model {
}
exports.Reservation = Reservation;
Reservation.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    customerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "customer_id",
    },
    tableId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "table_id",
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: "start_date",
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: "end_date",
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
    modelName: "Reservation",
    tableName: "reservations",
    timestamps: true,
});
//# sourceMappingURL=reservation.model.js.map