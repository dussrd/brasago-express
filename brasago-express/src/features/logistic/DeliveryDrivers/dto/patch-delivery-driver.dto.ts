import { UpdateDeliveryDriverDto } from "./update-delivery-driver.dto";

/** Datos de entrada de `PATCH /api/delivery-drivers/:id` (actualización parcial). */
export type PatchDeliveryDriverDto = Partial<UpdateDeliveryDriverDto>;
