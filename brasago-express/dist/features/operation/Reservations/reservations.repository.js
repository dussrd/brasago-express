"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsRepository = void 0;
const reservation_model_1 = require("./reservation.model");
/**
 * Capa Repository del feature Reservations.
 *
 * Única responsable de hablar con Sequelize (el modelo `Reservation`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
class ReservationsRepository {
    /** Todos los registros. */
    async findAll() {
        return reservation_model_1.Reservation.findAll();
    }
    /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
    async findById(id, transaction) {
        return reservation_model_1.Reservation.findByPk(id, { transaction });
    }
    /** Inserta un registro. */
    async create(data) {
        return reservation_model_1.Reservation.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(reservation, data) {
        return reservation.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(reservation) {
        await reservation.destroy();
    }
}
exports.ReservationsRepository = ReservationsRepository;
//# sourceMappingURL=reservations.repository.js.map