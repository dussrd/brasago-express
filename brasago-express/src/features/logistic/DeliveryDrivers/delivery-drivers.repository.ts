import { CreationAttributes, Transaction } from "sequelize";
import { DeliveryDriver, DeliveryDriverI } from "./delivery-driver.model";

/**
 * Capa Repository del feature DeliveryDrivers.
 *
 * Única responsable de hablar con Sequelize (el modelo `DeliveryDriver`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
export class DeliveryDriversRepository {
  /** Todos los registros activos. */
  public async findAllActive(): Promise<DeliveryDriver[]> {
    return DeliveryDriver.findAll({ where: { status: "active" } });
  }

  /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
  public async findById(id: number, transaction?: Transaction): Promise<DeliveryDriver | null> {
    return DeliveryDriver.findByPk(id, { transaction });
  }

  /** Inserta un registro. */
  public async create(data: CreationAttributes<DeliveryDriver>): Promise<DeliveryDriver> {
    return DeliveryDriver.create(data);
  }

  /** Persiste cambios sobre una instancia existente. */
  public async update(deliveryDriver: DeliveryDriver, data: Partial<DeliveryDriverI>): Promise<DeliveryDriver> {
    return deliveryDriver.update(data);
  }

  /** Elimina físicamente una instancia. */
  public async delete(deliveryDriver: DeliveryDriver): Promise<void> {
    await deliveryDriver.destroy();
  }
}
