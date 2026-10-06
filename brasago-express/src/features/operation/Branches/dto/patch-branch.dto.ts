import { UpdateBranchDto } from "./update-branch.dto";

/** Datos de entrada de `PATCH /api/branches/:id` (actualización parcial). */
export type PatchBranchDto = Partial<UpdateBranchDto>;
