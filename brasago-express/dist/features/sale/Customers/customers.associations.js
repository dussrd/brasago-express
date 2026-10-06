"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customer_model_1 = require("./customer.model");
const order_model_1 = require("../Orders/order.model");
const reservation_model_1 = require("../../operation/Reservations/reservation.model");
/** Relaciones del modelo Customer. Se cargan después de inicializar todos los modelos. */
customer_model_1.Customer.hasMany(order_model_1.Order, { foreignKey: "customerId", as: "orders" });
customer_model_1.Customer.hasMany(reservation_model_1.Reservation, { foreignKey: "customerId", as: "reservations" });
//# sourceMappingURL=customers.associations.js.map