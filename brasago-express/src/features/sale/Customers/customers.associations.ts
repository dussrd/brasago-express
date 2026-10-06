import { Customer } from "./customer.model";
import { Order } from "../Orders/order.model";
import { Reservation } from "../../operation/Reservations/reservation.model";

/** Relaciones del modelo Customer. Se cargan después de inicializar todos los modelos. */
Customer.hasMany(Order, { foreignKey: "customerId", as: "orders" });
Customer.hasMany(Reservation, { foreignKey: "customerId", as: "reservations" });
