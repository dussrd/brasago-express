export interface CreateProductDto {
  sku: string;
  name: string;
  description?: string;
  price: number;
  /** Opcional: por defecto `active`. Tras crearlo, el estado sólo cambia con el borrado lógico. */
  status?: "active" | "inactive";
}
