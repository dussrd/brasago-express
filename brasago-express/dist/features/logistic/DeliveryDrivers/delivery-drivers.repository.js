"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryDriversRepository = void 0;
const delivery_driver_model_1 = require("./delivery-driver.model");
/**
 * Capa Repository del feature DeliveryDrivers.
 *
 * Única responsable de hablar con Sequelize (el modelo `DeliveryDriver`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
class DeliveryDriversRepository {
    /** Todos los registros activos. */
    async findAllActive() {
        return delivery_driver_model_1.DeliveryDriver.findAll({ where: { status: "active" } });
    }
    /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
    async findById(id, transaction) {
        return delivery_driver_model_1.DeliveryDriver.findByPk(id, { transaction });
    }
    /** Inserta un registro. */
    async create(data) {
        return delivery_driver_model_1.DeliveryDriver.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(deliveryDriver, data) {
        return deliveryDriver.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(deliveryDriver) {
        await deliveryDriver.destroy();
    }
}
exports.DeliveryDriversRepository = DeliveryDriversRepository;
//# sourceMappingURL=delivery-drivers.repository.js.map