import { CreationAttributes, Transaction } from "sequelize";
import { Ingredient, IngredientI } from "./ingredient.model";

/**
 * Capa Repository del feature Ingredients.
 *
 * Única responsable de hablar con Sequelize (el modelo `Ingredient`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
export class IngredientsRepository {
  /** Todos los registros activos. */
  public async findAllActive(): Promise<Ingredient[]> {
    return Ingredient.findAll({ where: { status: "active" } });
  }

  /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
  public async findById(id: number, transaction?: Transaction): Promise<Ingredient | null> {
    return Ingredient.findByPk(id, { transaction });
  }

  /** Inserta un registro. */
  public async create(data: CreationAttributes<Ingredient>): Promise<Ingredient> {
    return Ingredient.create(data);
  }

  /** Persiste cambios sobre una instancia existente. */
  public async update(ingredient: Ingredient, data: Partial<IngredientI>): Promise<Ingredient> {
    return ingredient.update(data);
  }

  /** Elimina físicamente una instancia. */
  public async delete(ingredient: Ingredient): Promise<void> {
    await ingredient.destroy();
  }
}
