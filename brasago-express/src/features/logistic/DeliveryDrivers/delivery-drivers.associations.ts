import { DeliveryDriver } from "./delivery-driver.model";
import { Delivery } from "../Deliveries/delivery.model";

/** Relaciones del modelo DeliveryDriver. Se cargan después de inicializar todos los modelos. */
DeliveryDriver.hasMany(Delivery, { foreignKey: "deliveryDriverId", as: "deliveries" });
