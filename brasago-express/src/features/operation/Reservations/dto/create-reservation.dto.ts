export interface CreateReservationDto {
  customerId: number;
  tableId: number;
  startDate: Date;
  endDate: Date;
  /** Opcional: por defecto `active`. Tras crearlo, el estado sólo cambia con el borrado lógico. */
  status?: "active" | "inactive";
  observations?: string;
}
