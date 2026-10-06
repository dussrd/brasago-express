import { UpdateIngredientDto } from "./update-ingredient.dto";

/** Datos de entrada de `PATCH /api/ingredients/:id` (actualización parcial). */
export type PatchIngredientDto = Partial<UpdateIngredientDto>;
