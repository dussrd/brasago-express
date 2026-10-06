"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reservation_model_1 = require("./reservation.model");
const customer_model_1 = require("../../sale/Customers/customer.model");
const table_model_1 = require("../Tables/table.model");
/** Relaciones del modelo Reservation. Se cargan después de inicializar todos los modelos. */
reservation_model_1.Reservation.belongsTo(customer_model_1.Customer, { foreignKey: "customerId", as: "customer" });
reservation_model_1.Reservation.belongsTo(table_model_1.Table, { foreignKey: "tableId", as: "table" });
//# sourceMappingURL=reservations.associations.js.map