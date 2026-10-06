import { Branch, BranchI } from "../branch.model";

/**
 * Respuesta HTTP de una sucursal. Lo usan `GET /api/branches`,
 * `GET /api/branches/:id` y la salida de create/update/delete lógico.
 *
 * Regla del DTO de respuesta: la API expone **sólo** lo que declara este tipo.
 * Esta entidad no tiene campos internos que ocultar, por lo que el DTO coincide
 * con la interfaz del modelo y no necesita una proyección con `Omit`.
 */
export type BranchResponseDto = BranchI;

/** Mapper modelo -> DTO de respuesta (objeto plano). */
export function toBranchResponse(branch: Branch): BranchResponseDto {
  return branch.toJSON() as BranchI;
}
