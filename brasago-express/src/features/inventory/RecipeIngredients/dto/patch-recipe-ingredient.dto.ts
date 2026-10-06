import { UpdateRecipeIngredientDto } from "./update-recipe-ingredient.dto";

/** Datos de entrada de `PATCH /api/recipe-ingredients/:id` (actualización parcial). */
export type PatchRecipeIngredientDto = Partial<UpdateRecipeIngredientDto>;
