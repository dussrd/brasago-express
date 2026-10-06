import { UpdateOrderDetailDto } from "./update-order-detail.dto";

/** Datos de entrada de `PATCH /api/order-details/:id` (actualización parcial). */
export type PatchOrderDetailDto = Partial<UpdateOrderDetailDto>;
