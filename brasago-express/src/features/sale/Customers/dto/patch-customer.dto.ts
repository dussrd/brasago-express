import { UpdateCustomerDto } from "./update-customer.dto";

/** Datos de entrada de `PATCH /api/customers/:id` (actualización parcial). */
export type PatchCustomerDto = Partial<UpdateCustomerDto>;
