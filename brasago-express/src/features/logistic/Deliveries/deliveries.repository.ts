import { CreationAttributes, Transaction } from "sequelize";
import { Delivery, DeliveryI } from "./delivery.model";

/**
 * Capa Repository del feature Deliveries.
 *
 * Única responsable de hablar con Sequelize (el modelo `Delivery`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
export class DeliveriesRepository {
  /** Todos los registros. */
  public async findAll(): Promise<Delivery[]> {
    return Delivery.findAll();
  }

  /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
  public async findById(id: number, transaction?: Transaction): Promise<Delivery | null> {
    return Delivery.findByPk(id, { transaction });
  }

  /** Inserta un registro. */
  public async create(data: CreationAttributes<Delivery>): Promise<Delivery> {
    return Delivery.create(data);
  }

  /** Persiste cambios sobre una instancia existente. */
  public async update(delivery: Delivery, data: Partial<DeliveryI>): Promise<Delivery> {
    return delivery.update(data);
  }

  /** Elimina físicamente una instancia. */
  public async delete(delivery: Delivery): Promise<void> {
    await delivery.destroy();
  }
}
