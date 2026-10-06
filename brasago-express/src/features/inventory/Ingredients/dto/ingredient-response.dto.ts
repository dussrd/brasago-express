import { Ingredient, IngredientI } from "../ingredient.model";

/**
 * Respuesta HTTP de un ingrediente. Lo usan `GET /api/ingredients`,
 * `GET /api/ingredients/:id` y la salida de create/update/delete lógico.
 *
 * Regla del DTO de respuesta: la API expone **sólo** lo que declara este tipo.
 * Esta entidad no tiene campos internos que ocultar, por lo que el DTO coincide
 * con la interfaz del modelo y no necesita una proyección con `Omit`.
 */
export type IngredientResponseDto = IngredientI;

/** Mapper modelo -> DTO de respuesta (objeto plano). */
export function toIngredientResponse(
  ingredient: Ingredient
): IngredientResponseDto {
  return ingredient.toJSON() as IngredientI;
}
