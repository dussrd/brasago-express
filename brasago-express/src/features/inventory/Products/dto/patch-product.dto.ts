import { UpdateProductDto } from "./update-product.dto";

/** Datos de entrada de `PATCH /api/products/:id` (actualización parcial). */
export type PatchProductDto = Partial<UpdateProductDto>;
