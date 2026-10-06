"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsRepository = void 0;
const payment_model_1 = require("./payment.model");
/**
 * Capa Repository del feature Payments.
 *
 * Única responsable de hablar con Sequelize (el modelo `Payment`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
class PaymentsRepository {
    /** Todos los registros. */
    async findAll() {
        return payment_model_1.Payment.findAll();
    }
    /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
    async findById(id, transaction) {
        return payment_model_1.Payment.findByPk(id, { transaction });
    }
    /** Inserta un registro. */
    async create(data) {
        return payment_model_1.Payment.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(payment, data) {
        return payment.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(payment) {
        await payment.destroy();
    }
}
exports.PaymentsRepository = PaymentsRepository;
//# sourceMappingURL=payments.repository.js.map