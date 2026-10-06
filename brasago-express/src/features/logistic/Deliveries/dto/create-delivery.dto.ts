export interface CreateDeliveryDto {
  orderId: number;
  deliveryDriverId: number;
  startDate: Date;
  endDate?: Date;
  total: number;
  /** Opcional: por defecto `active`. Tras crearlo, el estado sólo cambia con el borrado lógico. */
  status?: "active" | "inactive";
  observations?: string;
}
