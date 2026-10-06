"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchesRepository = void 0;
const branch_model_1 = require("./branch.model");
/**
 * Capa Repository del feature Branches.
 *
 * Única responsable de hablar con Sequelize (el modelo `Branch`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
class BranchesRepository {
    /** Todos los registros activos. */
    async findAllActive() {
        return branch_model_1.Branch.findAll({ where: { status: "active" } });
    }
    /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
    async findById(id, transaction) {
        return branch_model_1.Branch.findByPk(id, { transaction });
    }
    /** Inserta un registro. */
    async create(data) {
        return branch_model_1.Branch.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(branch, data) {
        return branch.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(branch) {
        await branch.destroy();
    }
}
exports.BranchesRepository = BranchesRepository;
//# sourceMappingURL=branches.repository.js.map