import { Table } from "./table.model";
import { Branch } from "../Branches/branch.model";
import { Reservation } from "../Reservations/reservation.model";

/** Relaciones del modelo Table. Se cargan después de inicializar todos los modelos. */
Table.belongsTo(Branch, { foreignKey: "branchId", as: "branch" });
Table.hasMany(Reservation, { foreignKey: "tableId", as: "reservations" });
