/**
 * Datos de entrada de `PUT /api/deliveries/:id` (reemplazo completo).
 *
 * `status` **no** está aquí a propósito: el estado sólo cambia con el borrado
 * lógico (`DELETE /api/deliveries/:id/deactivate`), que es una regla de negocio y
 * no un campo editable. Así se evita desactivar un registro por PUT/PATCH
 * saltándose el resto de reglas del caso de uso.
 */
export interface UpdateDeliveryDto {
  orderId: number;
  deliveryDriverId: number;
  startDate: Date;
  endDate?: Date;
  total: number;
  observations?: string;
}
