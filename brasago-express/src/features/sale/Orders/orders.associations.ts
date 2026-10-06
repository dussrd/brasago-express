import { Order } from "./order.model";
import { Branch } from "../../operation/Branches/branch.model";
import { Customer } from "../Customers/customer.model";
import { Delivery } from "../../logistic/Deliveries/delivery.model";
import { OrderDetail } from "../OrderDetails/order-detail.model";
import { Payment } from "../../finance/Payments/payment.model";

/** Relaciones del modelo Order. Se cargan después de inicializar todos los modelos. */
Order.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });
Order.belongsTo(Branch, { foreignKey: "branchId", as: "branch" });
Order.hasMany(OrderDetail, { foreignKey: "orderId", as: "items" });
Order.hasOne(Delivery, { foreignKey: "orderId", as: "delivery" });
Order.hasMany(Payment, {
  foreignKey: "referenceId",
  as: "payments",
  constraints: false,
  scope: { referenceType: "order" },
});
