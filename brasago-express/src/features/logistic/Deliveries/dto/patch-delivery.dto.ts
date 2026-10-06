import { UpdateDeliveryDto } from "./update-delivery.dto";

/** Datos de entrada de `PATCH /api/deliveries/:id` (actualización parcial). */
export type PatchDeliveryDto = Partial<UpdateDeliveryDto>;
