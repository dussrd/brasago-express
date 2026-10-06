import { Reservation, ReservationI } from "../reservation.model";

/**
 * Respuesta HTTP de una reserva. Lo usan `GET /api/reservations`,
 * `GET /api/reservations/:id` y la salida de create/update/delete lógico.
 *
 * Regla del DTO de respuesta: la API expone **sólo** lo que declara este tipo.
 * Esta entidad no tiene campos internos que ocultar, por lo que el DTO coincide
 * con la interfaz del modelo y no necesita una proyección con `Omit`.
 */
export type ReservationResponseDto = ReservationI;

/** Mapper modelo -> DTO de respuesta (objeto plano). */
export function toReservationResponse(
  reservation: Reservation
): ReservationResponseDto {
  return reservation.toJSON() as ReservationI;
}
