"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delivery_driver_model_1 = require("./delivery-driver.model");
const delivery_model_1 = require("../Deliveries/delivery.model");
/** Relaciones del modelo DeliveryDriver. Se cargan después de inicializar todos los modelos. */
delivery_driver_model_1.DeliveryDriver.hasMany(delivery_model_1.Delivery, { foreignKey: "deliveryDriverId", as: "deliveries" });
//# sourceMappingURL=delivery-drivers.associations.js.map