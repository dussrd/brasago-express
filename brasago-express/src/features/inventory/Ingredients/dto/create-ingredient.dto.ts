export interface CreateIngredientDto {
  code: string;
  name: string;
  unitOfMeasure: string;
  minimumStock: number;
  /** Opcional: por defecto `active`. Tras crearlo, el estado sólo cambia con el borrado lógico. */
  status?: "active" | "inactive";
}
