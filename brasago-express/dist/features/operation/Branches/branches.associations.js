"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const branch_model_1 = require("./branch.model");
const order_model_1 = require("../../sale/Orders/order.model");
const table_model_1 = require("../Tables/table.model");
/** Relaciones del modelo Branch. Se cargan después de inicializar todos los modelos. */
branch_model_1.Branch.hasMany(table_model_1.Table, { foreignKey: "branchId", as: "tables" });
branch_model_1.Branch.hasMany(order_model_1.Order, { foreignKey: "branchId", as: "orders" });
//# sourceMappingURL=branches.associations.js.map