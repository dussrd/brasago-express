import { OrderDetail, OrderDetailI } from "../order-detail.model";

/**
 * Respuesta HTTP de un detalle de pedido. Lo usan `GET /api/order-details`,
 * `GET /api/order-details/:id` y la salida de create/update/delete lógico.
 *
 * Regla del DTO de respuesta: la API expone **sólo** lo que declara este tipo.
 * Esta entidad no tiene campos internos que ocultar, por lo que el DTO coincide
 * con la interfaz del modelo y no necesita una proyección con `Omit`.
 */
export type OrderDetailResponseDto = OrderDetailI;

/** Mapper modelo -> DTO de respuesta (objeto plano). */
export function toOrderDetailResponse(
  orderDetail: OrderDetail
): OrderDetailResponseDto {
  return orderDetail.toJSON() as OrderDetailI;
}
