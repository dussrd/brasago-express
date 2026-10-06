import { CreationAttributes, Transaction } from "sequelize";
import { Order, OrderI } from "./order.model";

/**
 * Capa Repository del feature Orders.
 *
 * Única responsable de hablar con Sequelize (el modelo `Order`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
export class OrdersRepository {
  /** Todos los registros. */
  public async findAll(): Promise<Order[]> {
    return Order.findAll();
  }

  /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
  public async findById(id: number, transaction?: Transaction): Promise<Order | null> {
    return Order.findByPk(id, { transaction });
  }

  /** Inserta un registro. */
  public async create(data: CreationAttributes<Order>): Promise<Order> {
    return Order.create(data);
  }

  /** Persiste cambios sobre una instancia existente. */
  public async update(order: Order, data: Partial<OrderI>): Promise<Order> {
    return order.update(data);
  }

  /** Elimina físicamente una instancia. */
  public async delete(order: Order): Promise<void> {
    await order.destroy();
  }
}
