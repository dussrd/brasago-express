"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeIngredientsRepository = void 0;
const recipe_ingredient_model_1 = require("./recipe-ingredient.model");
/**
 * Capa Repository del feature RecipeIngredients.
 *
 * Única responsable de hablar con Sequelize (el modelo `RecipeIngredient`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
class RecipeIngredientsRepository {
    /** Todos los registros activos. */
    async findAllActive() {
        return recipe_ingredient_model_1.RecipeIngredient.findAll({ where: { status: "active" } });
    }
    /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
    async findById(id, transaction) {
        return recipe_ingredient_model_1.RecipeIngredient.findByPk(id, { transaction });
    }
    /** Inserta un registro. */
    async create(data) {
        return recipe_ingredient_model_1.RecipeIngredient.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(recipeIngredient, data) {
        return recipeIngredient.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(recipeIngredient) {
        await recipeIngredient.destroy();
    }
}
exports.RecipeIngredientsRepository = RecipeIngredientsRepository;
//# sourceMappingURL=recipe-ingredients.repository.js.map