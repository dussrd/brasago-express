/**
 * Datos de entrada de `PUT /api/delivery-drivers/:id` (reemplazo completo).
 *
 * `status` **no** está aquí a propósito: el estado sólo cambia con el borrado
 * lógico (`DELETE /api/delivery-drivers/:id/deactivate`), que es una regla de negocio y
 * no un campo editable. Así se evita desactivar un registro por PUT/PATCH
 * saltándose el resto de reglas del caso de uso.
 */
export interface UpdateDeliveryDriverDto {
  name: string;
  description?: string;
}
