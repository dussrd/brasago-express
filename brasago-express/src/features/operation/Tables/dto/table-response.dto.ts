import { Table, TableI } from "../table.model";

/**
 * Respuesta HTTP de una mesa. Lo usan `GET /api/tables`,
 * `GET /api/tables/:id` y la salida de create/update/delete lógico.
 *
 * Regla del DTO de respuesta: la API expone **sólo** lo que declara este tipo.
 * Esta entidad no tiene campos internos que ocultar, por lo que el DTO coincide
 * con la interfaz del modelo y no necesita una proyección con `Omit`.
 */
export type TableResponseDto = TableI;

/** Mapper modelo -> DTO de respuesta (objeto plano). */
export function toTableResponse(table: Table): TableResponseDto {
  return table.toJSON() as TableI;
}
