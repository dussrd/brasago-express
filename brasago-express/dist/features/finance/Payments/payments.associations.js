"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const payment_model_1 = require("./payment.model");
const order_model_1 = require("../../sale/Orders/order.model");
/** Relaciones del modelo Payment. Se cargan después de inicializar todos los modelos. */
// referenceId es polimórfico: no se impone una FK exclusiva a orders.
payment_model_1.Payment.belongsTo(order_model_1.Order, { foreignKey: "referenceId", as: "order", constraints: false });
//# sourceMappingURL=payments.associations.js.map