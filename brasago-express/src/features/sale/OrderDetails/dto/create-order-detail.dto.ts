export interface CreateOrderDetailDto {
  orderId: number;
  productId: number;
  quantity: number;
  unitValue: number;
  total: number;
  observations?: string;
  /** Opcional: por defecto `active`. Tras crearlo, el estado sólo cambia con el borrado lógico. */
  status?: "active" | "inactive";
}
