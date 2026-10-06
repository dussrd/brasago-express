"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("./order.model");
const branch_model_1 = require("../../operation/Branches/branch.model");
const customer_model_1 = require("../Customers/customer.model");
const delivery_model_1 = require("../../logistic/Deliveries/delivery.model");
const order_detail_model_1 = require("../OrderDetails/order-detail.model");
const payment_model_1 = require("../../finance/Payments/payment.model");
/** Relaciones del modelo Order. Se cargan después de inicializar todos los modelos. */
order_model_1.Order.belongsTo(customer_model_1.Customer, { foreignKey: "customerId", as: "customer" });
order_model_1.Order.belongsTo(branch_model_1.Branch, { foreignKey: "branchId", as: "branch" });
order_model_1.Order.hasMany(order_detail_model_1.OrderDetail, { foreignKey: "orderId", as: "items" });
order_model_1.Order.hasOne(delivery_model_1.Delivery, { foreignKey: "orderId", as: "delivery" });
order_model_1.Order.hasMany(payment_model_1.Payment, {
    foreignKey: "referenceId",
    as: "payments",
    constraints: false,
    scope: { referenceType: "order" },
});
//# sourceMappingURL=orders.associations.js.map