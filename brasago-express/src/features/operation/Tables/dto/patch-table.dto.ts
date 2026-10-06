import { UpdateTableDto } from "./update-table.dto";

/** Datos de entrada de `PATCH /api/tables/:id` (actualización parcial). */
export type PatchTableDto = Partial<UpdateTableDto>;
