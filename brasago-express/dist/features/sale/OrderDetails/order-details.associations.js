"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_detail_model_1 = require("./order-detail.model");
const order_model_1 = require("../Orders/order.model");
const product_model_1 = require("../../inventory/Products/product.model");
/** Relaciones del modelo OrderDetail. Se cargan después de inicializar todos los modelos. */
order_detail_model_1.OrderDetail.belongsTo(order_model_1.Order, { foreignKey: "orderId", as: "order" });
order_detail_model_1.OrderDetail.belongsTo(product_model_1.Product, { foreignKey: "productId", as: "product" });
//# sourceMappingURL=order-details.associations.js.map