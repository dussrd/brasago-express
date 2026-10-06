import { CreationAttributes, Transaction } from "sequelize";
import { Branch, BranchI } from "./branch.model";

/**
 * Capa Repository del feature Branches.
 *
 * Única responsable de hablar con Sequelize (el modelo `Branch`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
export class BranchesRepository {
  /** Todos los registros activos. */
  public async findAllActive(): Promise<Branch[]> {
    return Branch.findAll({ where: { status: "active" } });
  }

  /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
  public async findById(id: number, transaction?: Transaction): Promise<Branch | null> {
    return Branch.findByPk(id, { transaction });
  }

  /** Inserta un registro. */
  public async create(data: CreationAttributes<Branch>): Promise<Branch> {
    return Branch.create(data);
  }

  /** Persiste cambios sobre una instancia existente. */
  public async update(branch: Branch, data: Partial<BranchI>): Promise<Branch> {
    return branch.update(data);
  }

  /** Elimina físicamente una instancia. */
  public async delete(branch: Branch): Promise<void> {
    await branch.destroy();
  }
}
