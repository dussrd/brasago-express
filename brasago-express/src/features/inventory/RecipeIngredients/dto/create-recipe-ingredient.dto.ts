export interface CreateRecipeIngredientDto {
  productId: number;
  ingredientId: number;
  quantity: number;
  /** Opcional: por defecto `active`. Tras crearlo, el estado sólo cambia con el borrado lógico. */
  status?: "active" | "inactive";
}
