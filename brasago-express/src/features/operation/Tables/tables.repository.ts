import { CreationAttributes, Transaction } from "sequelize";
import { Table, TableI } from "./table.model";

/**
 * Capa Repository del feature Tables.
 *
 * Única responsable de hablar con Sequelize (el modelo `Table`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
export class TablesRepository {
  /** Todos los registros activos. */
  public async findAllActive(): Promise<Table[]> {
    return Table.findAll({ where: { status: "active" } });
  }

  /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
  public async findById(id: number, transaction?: Transaction): Promise<Table | null> {
    return Table.findByPk(id, { transaction });
  }

  /** Inserta un registro. */
  public async create(data: CreationAttributes<Table>): Promise<Table> {
    return Table.create(data);
  }

  /** Persiste cambios sobre una instancia existente. */
  public async update(table: Table, data: Partial<TableI>): Promise<Table> {
    return table.update(data);
  }

  /** Elimina físicamente una instancia. */
  public async delete(table: Table): Promise<void> {
    await table.destroy();
  }
}
