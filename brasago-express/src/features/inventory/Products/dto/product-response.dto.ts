import { Product, ProductI } from "../product.model";

/**
 * Respuesta HTTP de un producto. Lo usan `GET /api/products`,
 * `GET /api/products/:id` y la salida de create/update/delete lógico.
 *
 * Regla del DTO de respuesta: la API expone **sólo** lo que declara este tipo.
 * Esta entidad no tiene campos internos que ocultar, por lo que el DTO coincide
 * con la interfaz del modelo y no necesita una proyección con `Omit`.
 */
export type ProductResponseDto = ProductI;

/** Mapper modelo -> DTO de respuesta (objeto plano). */
export function toProductResponse(product: Product): ProductResponseDto {
  return product.toJSON() as ProductI;
}
