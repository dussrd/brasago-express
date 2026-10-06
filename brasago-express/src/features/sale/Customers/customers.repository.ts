import { CreationAttributes, Transaction } from "sequelize";
import { Customer, CustomerI } from "./customer.model";

/**
 * Capa Repository del feature Customers.
 *
 * Única responsable de hablar con Sequelize (el modelo `Customer`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
export class CustomersRepository {
  /** Todos los registros activos. */
  public async findAllActive(): Promise<Customer[]> {
    return Customer.findAll({ where: { status: "active" } });
  }

  /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
  public async findById(id: number, transaction?: Transaction): Promise<Customer | null> {
    return Customer.findByPk(id, { transaction });
  }

  /** Inserta un registro. */
  public async create(data: CreationAttributes<Customer>): Promise<Customer> {
    return Customer.create(data);
  }

  /** Persiste cambios sobre una instancia existente. */
  public async update(customer: Customer, data: Partial<CustomerI>): Promise<Customer> {
    return customer.update(data);
  }

  /** Elimina físicamente una instancia. */
  public async delete(customer: Customer): Promise<void> {
    await customer.destroy();
  }
}
