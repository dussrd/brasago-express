import { CreationAttributes, Transaction } from "sequelize";
import { Reservation, ReservationI } from "./reservation.model";

/**
 * Capa Repository del feature Reservations.
 *
 * Única responsable de hablar con Sequelize (el modelo `Reservation`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
export class ReservationsRepository {
  /** Todos los registros. */
  public async findAll(): Promise<Reservation[]> {
    return Reservation.findAll();
  }

  /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
  public async findById(id: number, transaction?: Transaction): Promise<Reservation | null> {
    return Reservation.findByPk(id, { transaction });
  }

  /** Inserta un registro. */
  public async create(data: CreationAttributes<Reservation>): Promise<Reservation> {
    return Reservation.create(data);
  }

  /** Persiste cambios sobre una instancia existente. */
  public async update(reservation: Reservation, data: Partial<ReservationI>): Promise<Reservation> {
    return reservation.update(data);
  }

  /** Elimina físicamente una instancia. */
  public async delete(reservation: Reservation): Promise<void> {
    await reservation.destroy();
  }
}
