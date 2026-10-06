import { CreationAttributes, Transaction } from "sequelize";
import { OrderDetail, OrderDetailI } from "./order-detail.model";

/**
 * Capa Repository del feature OrderDetails.
 *
 * Única responsable de hablar con Sequelize (el modelo `OrderDetail`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
export class OrderDetailsRepository {
  /** Todos los registros. */
  public async findAllActive(): Promise<OrderDetail[]> {
    return OrderDetail.findAll({ where: { status: "active" } });
  }

  /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
  public async findById(id: number, transaction?: Transaction): Promise<OrderDetail | null> {
    return OrderDetail.findByPk(id, { transaction });
  }

  /** Inserta un registro. */
  public async create(data: CreationAttributes<OrderDetail>): Promise<OrderDetail> {
    return OrderDetail.create(data);
  }

  /** Persiste cambios sobre una instancia existente. */
  public async update(orderDetail: OrderDetail, data: Partial<OrderDetailI>): Promise<OrderDetail> {
    return orderDetail.update(data);
  }

  /** Elimina físicamente una instancia. */
  public async delete(orderDetail: OrderDetail): Promise<void> {
    await orderDetail.destroy();
  }
}
