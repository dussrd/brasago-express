import { Delivery } from "./delivery.model";
import { DeliveryDriver } from "../DeliveryDrivers/delivery-driver.model";
import { Order } from "../../sale/Orders/order.model";

/** Relaciones del modelo Delivery. Se cargan después de inicializar todos los modelos. */
Delivery.belongsTo(Order, { foreignKey: "orderId", as: "order" });
Delivery.belongsTo(DeliveryDriver, { foreignKey: "deliveryDriverId", as: "deliveryDriver" });
