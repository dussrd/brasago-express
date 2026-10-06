import { Reservation } from "./reservation.model";
import { Customer } from "../../sale/Customers/customer.model";
import { Table } from "../Tables/table.model";

/** Relaciones del modelo Reservation. Se cargan después de inicializar todos los modelos. */
Reservation.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });
Reservation.belongsTo(Table, { foreignKey: "tableId", as: "table" });
