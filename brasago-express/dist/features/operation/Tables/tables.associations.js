"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_model_1 = require("./table.model");
const branch_model_1 = require("../Branches/branch.model");
const reservation_model_1 = require("../Reservations/reservation.model");
/** Relaciones del modelo Table. Se cargan después de inicializar todos los modelos. */
table_model_1.Table.belongsTo(branch_model_1.Branch, { foreignKey: "branchId", as: "branch" });
table_model_1.Table.hasMany(reservation_model_1.Reservation, { foreignKey: "tableId", as: "reservations" });
//# sourceMappingURL=tables.associations.js.map