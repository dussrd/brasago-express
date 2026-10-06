"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetailsRepository = void 0;
const order_detail_model_1 = require("./order-detail.model");
/**
 * Capa Repository del feature OrderDetails.
 *
 * Única responsable de hablar con Sequelize (el modelo `OrderDetail`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
class OrderDetailsRepository {
    /** Todos los registros. */
    async findAllActive() {
        return order_detail_model_1.OrderDetail.findAll({ where: { status: "active" } });
    }
    /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
    async findById(id, transaction) {
        return order_detail_model_1.OrderDetail.findByPk(id, { transaction });
    }
    /** Inserta un registro. */
    async create(data) {
        return order_detail_model_1.OrderDetail.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(orderDetail, data) {
        return orderDetail.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(orderDetail) {
        await orderDetail.destroy();
    }
}
exports.OrderDetailsRepository = OrderDetailsRepository;
//# sourceMappingURL=order-details.repository.js.map