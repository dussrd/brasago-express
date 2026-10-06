"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablesRepository = void 0;
const table_model_1 = require("./table.model");
/**
 * Capa Repository del feature Tables.
 *
 * Única responsable de hablar con Sequelize (el modelo `Table`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
class TablesRepository {
    /** Todos los registros activos. */
    async findAllActive() {
        return table_model_1.Table.findAll({ where: { status: "active" } });
    }
    /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
    async findById(id, transaction) {
        return table_model_1.Table.findByPk(id, { transaction });
    }
    /** Inserta un registro. */
    async create(data) {
        return table_model_1.Table.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(table, data) {
        return table.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(table) {
        await table.destroy();
    }
}
exports.TablesRepository = TablesRepository;
//# sourceMappingURL=tables.repository.js.map