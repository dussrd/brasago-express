"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delivery_model_1 = require("./delivery.model");
const delivery_driver_model_1 = require("../DeliveryDrivers/delivery-driver.model");
const order_model_1 = require("../../sale/Orders/order.model");
/** Relaciones del modelo Delivery. Se cargan después de inicializar todos los modelos. */
delivery_model_1.Delivery.belongsTo(order_model_1.Order, { foreignKey: "orderId", as: "order" });
delivery_model_1.Delivery.belongsTo(delivery_driver_model_1.DeliveryDriver, { foreignKey: "deliveryDriverId", as: "deliveryDriver" });
//# sourceMappingURL=deliveries.associations.js.map