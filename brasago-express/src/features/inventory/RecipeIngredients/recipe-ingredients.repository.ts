import { CreationAttributes, Transaction } from "sequelize";
import { RecipeIngredient, RecipeIngredientI } from "./recipe-ingredient.model";

/**
 * Capa Repository del feature RecipeIngredients.
 *
 * Única responsable de hablar con Sequelize (el modelo `RecipeIngredient`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
export class RecipeIngredientsRepository {
  /** Todos los registros activos. */
  public async findAllActive(): Promise<RecipeIngredient[]> {
    return RecipeIngredient.findAll({ where: { status: "active" } });
  }

  /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
  public async findById(id: number, transaction?: Transaction): Promise<RecipeIngredient | null> {
    return RecipeIngredient.findByPk(id, { transaction });
  }

  /** Inserta un registro. */
  public async create(data: CreationAttributes<RecipeIngredient>): Promise<RecipeIngredient> {
    return RecipeIngredient.create(data);
  }

  /** Persiste cambios sobre una instancia existente. */
  public async update(recipeIngredient: RecipeIngredient, data: Partial<RecipeIngredientI>): Promise<RecipeIngredient> {
    return recipeIngredient.update(data);
  }

  /** Elimina físicamente una instancia. */
  public async delete(recipeIngredient: RecipeIngredient): Promise<void> {
    await recipeIngredient.destroy();
  }
}
