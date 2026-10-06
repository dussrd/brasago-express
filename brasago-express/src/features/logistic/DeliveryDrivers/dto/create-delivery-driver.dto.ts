export interface CreateDeliveryDriverDto {
  name: string;
  description?: string;
  /** Opcional: por defecto `active`. Tras crearlo, el estado sólo cambia con el borrado lógico. */
  status?: "active" | "inactive";
}
