import { Payment } from "./payment.model";
import { Order } from "../../sale/Orders/order.model";

/** Relaciones del modelo Payment. Se cargan después de inicializar todos los modelos. */
// referenceId es polimórfico: no se impone una FK exclusiva a orders.
Payment.belongsTo(Order, { foreignKey: "referenceId", as: "order", constraints: false });
