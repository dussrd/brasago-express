"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Customer extends sequelize_1.Model {
}
exports.Customer = Customer;
Customer.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    documentType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: "document_type",
    },
    documentNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "document_number",
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: { msg: "Email must be a valid email address" },
        },
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive"),
        defaultValue: "inactive",
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Customer",
    tableName: "customers",
    timestamps: true,
});
//# sourceMappingURL=customer.model.js.map