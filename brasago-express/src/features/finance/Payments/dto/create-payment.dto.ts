export interface CreatePaymentDto {
  referenceType: string;
  referenceId: number;
  method: string;
  amount: number;
  date: Date;
  /** Opcional: por defecto `active`. Tras crearlo, el estado sólo cambia con el borrado lógico. */
  status?: "active" | "inactive";
}
