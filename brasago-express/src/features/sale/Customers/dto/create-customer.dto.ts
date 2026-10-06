export interface CreateCustomerDto {
  documentType: string;
  documentNumber: string;
  name: string;
  phone?: string;
  email?: string;
  /** Opcional: por defecto `active`. Tras crearlo, el estado sólo cambia con el borrado lógico. */
  status?: "active" | "inactive";
}
