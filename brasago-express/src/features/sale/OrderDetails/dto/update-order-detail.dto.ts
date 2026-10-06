/**
 * Datos de entrada de `PUT /api/order-details/:id` (reemplazo completo).
 *
 * `status` **no** está aquí a propósito: el estado sólo cambia con el borrado
 * lógico (`DELETE /api/order-details/:id/deactivate`), que es una regla de negocio y
 * no un campo editable. Así se evita desactivar un registro por PUT/PATCH
 * saltándose el resto de reglas del caso de uso.
 */
export interface UpdateOrderDetailDto {
  orderId: number;
  productId: number;
  quantity: number;
  unitValue: number;
  total: number;
  observations?: string;
}
