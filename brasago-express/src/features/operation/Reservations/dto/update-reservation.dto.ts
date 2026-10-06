/**
 * Datos de entrada de `PUT /api/reservations/:id` (reemplazo completo).
 *
 * `status` **no** está aquí a propósito: el estado sólo cambia con el borrado
 * lógico (`DELETE /api/reservations/:id/deactivate`), que es una regla de negocio y
 * no un campo editable. Así se evita desactivar un registro por PUT/PATCH
 * saltándose el resto de reglas del caso de uso.
 */
export interface UpdateReservationDto {
  customerId: number;
  tableId: number;
  startDate: Date;
  endDate: Date;
  observations?: string;
}
