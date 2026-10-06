import { Payment, PaymentI } from "../payment.model";

/**
 * Respuesta HTTP de un pago. Lo usan `GET /api/payments`,
 * `GET /api/payments/:id` y la salida de create/update/delete lógico.
 *
 * Regla del DTO de respuesta: la API expone **sólo** lo que declara este tipo.
 * Esta entidad no tiene campos internos que ocultar, por lo que el DTO coincide
 * con la interfaz del modelo y no necesita una proyección con `Omit`.
 */
export type PaymentResponseDto = PaymentI;

/** Mapper modelo -> DTO de respuesta (objeto plano). */
export function toPaymentResponse(payment: Payment): PaymentResponseDto {
  return payment.toJSON() as PaymentI;
}
