import { Customer, CustomerI } from "../customer.model";

/**
 * Respuesta HTTP de un cliente. Lo usan `GET /api/customers`,
 * `GET /api/customers/:id` y la salida de create/update/delete lógico.
 *
 * Regla del DTO de respuesta: la API expone **sólo** lo que declara este tipo.
 * Esta entidad no tiene campos internos que ocultar, por lo que el DTO coincide
 * con la interfaz del modelo y no necesita una proyección con `Omit`.
 */
export type CustomerResponseDto = CustomerI;

/** Mapper modelo -> DTO de respuesta (objeto plano). */
export function toCustomerResponse(customer: Customer): CustomerResponseDto {
  return customer.toJSON() as CustomerI;
}
