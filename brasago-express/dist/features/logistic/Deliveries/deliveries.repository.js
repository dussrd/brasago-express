"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveriesRepository = void 0;
const delivery_model_1 = require("./delivery.model");
/**
 * Capa Repository del feature Deliveries.
 *
 * Única responsable de hablar con Sequelize (el modelo `Delivery`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
class DeliveriesRepository {
    /** Todos los registros. */
    async findAll() {
        return delivery_model_1.Delivery.findAll();
    }
    /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
    async findById(id, transaction) {
        return delivery_model_1.Delivery.findByPk(id, { transaction });
    }
    /** Inserta un registro. */
    async create(data) {
        return delivery_model_1.Delivery.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(delivery, data) {
        return delivery.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(delivery) {
        await delivery.destroy();
    }
}
exports.DeliveriesRepository = DeliveriesRepository;
//# sourceMappingURL=deliveries.repository.js.map