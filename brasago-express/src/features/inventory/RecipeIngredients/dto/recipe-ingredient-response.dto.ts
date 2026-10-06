import {
  RecipeIngredient,
  RecipeIngredientI,
} from "../recipe-ingredient.model";

/**
 * Respuesta HTTP de un ingrediente de receta. Lo usan `GET /api/recipe-ingredients`,
 * `GET /api/recipe-ingredients/:id` y la salida de create/update/delete lógico.
 *
 * Regla del DTO de respuesta: la API expone **sólo** lo que declara este tipo.
 * Esta entidad no tiene campos internos que ocultar, por lo que el DTO coincide
 * con la interfaz del modelo y no necesita una proyección con `Omit`.
 */
export type RecipeIngredientResponseDto = RecipeIngredientI;

/** Mapper modelo -> DTO de respuesta (objeto plano). */
export function toRecipeIngredientResponse(
  recipeIngredient: RecipeIngredient
): RecipeIngredientResponseDto {
  return recipeIngredient.toJSON() as RecipeIngredientI;
}
