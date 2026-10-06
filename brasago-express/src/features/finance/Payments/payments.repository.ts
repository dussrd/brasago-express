import { CreationAttributes, Transaction } from "sequelize";
import { Payment, PaymentI } from "./payment.model";

/**
 * Capa Repository del feature Payments.
 *
 * Única responsable de hablar con Sequelize (el modelo `Payment`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
export class PaymentsRepository {
  /** Todos los registros. */
  public async findAll(): Promise<Payment[]> {
    return Payment.findAll();
  }

  /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
  public async findById(id: number, transaction?: Transaction): Promise<Payment | null> {
    return Payment.findByPk(id, { transaction });
  }

  /** Inserta un registro. */
  public async create(data: CreationAttributes<Payment>): Promise<Payment> {
    return Payment.create(data);
  }

  /** Persiste cambios sobre una instancia existente. */
  public async update(payment: Payment, data: Partial<PaymentI>): Promise<Payment> {
    return payment.update(data);
  }

  /** Elimina físicamente una instancia. */
  public async delete(payment: Payment): Promise<void> {
    await payment.destroy();
  }
}
