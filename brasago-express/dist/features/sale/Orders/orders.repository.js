"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRepository = void 0;
const order_model_1 = require("./order.model");
/**
 * Capa Repository del feature Orders.
 *
 * Única responsable de hablar con Sequelize (el modelo `Order`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
class OrdersRepository {
    /** Todos los registros. */
    async findAll() {
        return order_model_1.Order.findAll();
    }
    /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
    async findById(id, transaction) {
        return order_model_1.Order.findByPk(id, { transaction });
    }
    /** Inserta un registro. */
    async create(data) {
        return order_model_1.Order.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(order, data) {
        return order.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(order) {
        await order.destroy();
    }
}
exports.OrdersRepository = OrdersRepository;
//# sourceMappingURL=orders.repository.js.map