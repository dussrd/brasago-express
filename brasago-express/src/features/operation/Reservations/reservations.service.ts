import {
  ReservationResponseDto,
  CreateReservationDto,
  PatchReservationDto,
  UpdateReservationDto,
  toReservationResponse,
} from "./dto";
import { ReservationsRepository } from "./reservations.repository";
import { Reservation } from "./reservation.model";
import { AppError } from "../../../shared/errors/app-error";

/**
 * Capa Service del feature Reservations.
 *
 * Reglas de negocio: estado por defecto, borrado lógico, borrado físico y respuesta DTO.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve **DTOs** (carpeta `dto/`), nunca instancias del modelo.
 */
export class ReservationsService {
  public constructor(
    private readonly repository: ReservationsRepository = new ReservationsRepository()
  ) {}

  // ================== READ ==================
  public async getAll(): Promise<ReservationResponseDto[]> {
    const records = await this.repository.findAll();
    return records.filter((record) => record.status === "active").map((record) => toReservationResponse(record));
  }

  public async getOne(id: number): Promise<ReservationResponseDto> {
    return toReservationResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  public async create(body: CreateReservationDto): Promise<ReservationResponseDto> {
    // Sólo los campos permitidos llegan al modelo; evita mass assignment.
    const record = await this.repository.create({
      customerId: body.customerId,
      tableId: body.tableId,
      startDate: body.startDate,
      endDate: body.endDate,
      observations: body.observations,
      status: body.status ?? "active",
    });
    return toReservationResponse(record);
  }

  // ================== UPDATE ==================
  public async updatePut(id: number, body: UpdateReservationDto): Promise<ReservationResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, {
      customerId: body.customerId,
      tableId: body.tableId,
      startDate: body.startDate,
      endDate: body.endDate,
      observations: body.observations,
    });
    return toReservationResponse(record);
  }

  public async updatePatch(id: number, body: PatchReservationDto): Promise<ReservationResponseDto> {
    const record = await this.findOrFail(id);
    // Copia sólo los campos editables enviados; conserva los demás.
    const data: PatchReservationDto = {};
    if (body.customerId !== undefined) data.customerId = body.customerId;
    if (body.tableId !== undefined) data.tableId = body.tableId;
    if (body.startDate !== undefined) data.startDate = body.startDate;
    if (body.endDate !== undefined) data.endDate = body.endDate;
    if (body.observations !== undefined) data.observations = body.observations;

    await this.repository.update(record, data);
    return toReservationResponse(record);
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(id: number): Promise<void> {
    const record = await this.findOrFail(id, false);
    await this.repository.delete(record);
  }

  /** Eliminación lógica -> `status = inactive`. */
  public async deleteLogical(id: number): Promise<ReservationResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, { status: "inactive" });
    return toReservationResponse(record);
  }

  // ================== HELPERS ==================
  /**
   * Busca por PK y falla con 404 si no existe o no está activo.
   * `onlyActive` aplica la política de borrado lógico a consultas y cambios.
   * El borrado físico lo desactiva para poder purgar registros inactivos.
   */
  private async findOrFail(id: number, onlyActive = true): Promise<Reservation> {
    const record = await this.repository.findById(id);
    if (!record || (onlyActive && record.status !== "active")) {
      throw new AppError(404, "Reservation not found");
    }
    return record;
  }
}
