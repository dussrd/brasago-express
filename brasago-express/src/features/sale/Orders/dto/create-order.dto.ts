export interface CreateOrderDto {
  customerId: number;
  branchId: number;
  channel: string;
  date: Date;
  subtotal: number;
  total: number;
  /** Opcional: por defecto `active`. Tras crearlo, el estado sólo cambia con el borrado lógico. */
  status?: "active" | "inactive";
}
