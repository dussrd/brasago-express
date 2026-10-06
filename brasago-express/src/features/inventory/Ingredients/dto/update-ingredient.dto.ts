/**
 * Datos de entrada de `PUT /api/ingredients/:id` (reemplazo completo).
 *
 * `status` **no** está aquí a propósito: el estado sólo cambia con el borrado
 * lógico (`DELETE /api/ingredients/:id/deactivate`), que es una regla de negocio y
 * no un campo editable. Así se evita desactivar un registro por PUT/PATCH
 * saltándose el resto de reglas del caso de uso.
 */
export interface UpdateIngredientDto {
  code: string;
  name: string;
  unitOfMeasure: string;
  minimumStock: number;
}
