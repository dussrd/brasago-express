import { Branch } from "./branch.model";
import { Order } from "../../sale/Orders/order.model";
import { Table } from "../Tables/table.model";

/** Relaciones del modelo Branch. Se cargan después de inicializar todos los modelos. */
Branch.hasMany(Table, { foreignKey: "branchId", as: "tables" });
Branch.hasMany(Order, { foreignKey: "branchId", as: "orders" });
