import { UpdateReservationDto } from "./update-reservation.dto";

/** Datos de entrada de `PATCH /api/reservations/:id` (actualización parcial). */
export type PatchReservationDto = Partial<UpdateReservationDto>;
