"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientsRepository = void 0;
const ingredient_model_1 = require("./ingredient.model");
/**
 * Capa Repository del feature Ingredients.
 *
 * Única responsable de hablar con Sequelize (el modelo `Ingredient`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
class IngredientsRepository {
    /** Todos los registros activos. */
    async findAllActive() {
        return ingredient_model_1.Ingredient.findAll({ where: { status: "active" } });
    }
    /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
    async findById(id, transaction) {
        return ingredient_model_1.Ingredient.findByPk(id, { transaction });
    }
    /** Inserta un registro. */
    async create(data) {
        return ingredient_model_1.Ingredient.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(ingredient, data) {
        return ingredient.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(ingredient) {
        await ingredient.destroy();
    }
}
exports.IngredientsRepository = IngredientsRepository;
//# sourceMappingURL=ingredients.repository.js.map