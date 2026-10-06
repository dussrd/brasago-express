import { Order, OrderI } from "../order.model";

/**
 * Respuesta HTTP de un pedido. Lo usan `GET /api/orders`,
 * `GET /api/orders/:id` y la salida de create/update/delete lógico.
 *
 * Regla del DTO de respuesta: la API expone **sólo** lo que declara este tipo.
 * Esta entidad no tiene campos internos que ocultar, por lo que el DTO coincide
 * con la interfaz del modelo y no necesita una proyección con `Omit`.
 */
export type OrderResponseDto = OrderI;

/** Mapper modelo -> DTO de respuesta (objeto plano). */
export function toOrderResponse(order: Order): OrderResponseDto {
  return order.toJSON() as OrderI;
}
