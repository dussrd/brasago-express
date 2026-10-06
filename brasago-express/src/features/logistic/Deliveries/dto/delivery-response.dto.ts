import { Delivery, DeliveryI } from "../delivery.model";

/**
 * Respuesta HTTP de una entrega. Lo usan `GET /api/deliveries`,
 * `GET /api/deliveries/:id` y la salida de create/update/delete lógico.
 *
 * Regla del DTO de respuesta: la API expone **sólo** lo que declara este tipo.
 * Esta entidad no tiene campos internos que ocultar, por lo que el DTO coincide
 * con la interfaz del modelo y no necesita una proyección con `Omit`.
 */
export type DeliveryResponseDto = DeliveryI;

/** Mapper modelo -> DTO de respuesta (objeto plano). */
export function toDeliveryResponse(delivery: Delivery): DeliveryResponseDto {
  return delivery.toJSON() as DeliveryI;
}
