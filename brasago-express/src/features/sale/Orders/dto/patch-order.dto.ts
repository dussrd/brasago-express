import { UpdateOrderDto } from "./update-order.dto";

/** Datos de entrada de `PATCH /api/orders/:id` (actualización parcial). */
export type PatchOrderDto = Partial<UpdateOrderDto>;
