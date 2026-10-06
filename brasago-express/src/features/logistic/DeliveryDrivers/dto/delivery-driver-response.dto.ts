import {
  DeliveryDriver,
  DeliveryDriverI,
} from "../delivery-driver.model";

/**
 * Respuesta HTTP de un repartidor. Lo usan `GET /api/delivery-drivers`,
 * `GET /api/delivery-drivers/:id` y la salida de create/update/delete lógico.
 *
 * Regla del DTO de respuesta: la API expone **sólo** lo que declara este tipo.
 * Esta entidad no tiene campos internos que ocultar, por lo que el DTO coincide
 * con la interfaz del modelo y no necesita una proyección con `Omit`.
 */
export type DeliveryDriverResponseDto = DeliveryDriverI;

/** Mapper modelo -> DTO de respuesta (objeto plano). */
export function toDeliveryDriverResponse(
  deliveryDriver: DeliveryDriver
): DeliveryDriverResponseDto {
  return deliveryDriver.toJSON() as DeliveryDriverI;
}
