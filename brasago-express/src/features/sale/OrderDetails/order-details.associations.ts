import { OrderDetail } from "./order-detail.model";
import { Order } from "../Orders/order.model";
import { Product } from "../../inventory/Products/product.model";

/** Relaciones del modelo OrderDetail. Se cargan después de inicializar todos los modelos. */
OrderDetail.belongsTo(Order, { foreignKey: "orderId", as: "order" });
OrderDetail.belongsTo(Product, { foreignKey: "productId", as: "product" });
