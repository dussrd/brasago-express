import {
  DeliveryResponseDto,
  CreateDeliveryDto,
  PatchDeliveryDto,
  UpdateDeliveryDto,
  toDeliveryResponse,
} from "./dto";
import { DeliveriesRepository } from "./deliveries.repository";
import { Delivery } from "./delivery.model";
import { AppError } from "../../../shared/errors/app-error";

/**
 * Capa Service del feature Deliveries.
 *
 * Reglas de negocio: estado por defecto, borrado lógico, borrado físico y respuesta DTO.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve **DTOs** (carpeta `dto/`), nunca instancias del modelo.
 */
export class DeliveriesService {
  public constructor(
    private readonly repository: DeliveriesRepository = new DeliveriesRepository()
  ) {}

  // ================== READ ==================
  public async getAll(): Promise<DeliveryResponseDto[]> {
    const records = await this.repository.findAll();
    return records.filter((record) => record.status === "active").map((record) => toDeliveryResponse(record));
  }

  public async getOne(id: number): Promise<DeliveryResponseDto> {
    return toDeliveryResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  public async create(body: CreateDeliveryDto): Promise<DeliveryResponseDto> {
    // Sólo los campos permitidos llegan al modelo; evita mass assignment.
    const record = await this.repository.create({
      orderId: body.orderId,
      deliveryDriverId: body.deliveryDriverId,
      startDate: body.startDate,
      endDate: body.endDate,
      total: body.total,
      observations: body.observations,
      status: body.status ?? "active",
    });
    return toDeliveryResponse(record);
  }

  // ================== UPDATE ==================
  public async updatePut(id: number, body: UpdateDeliveryDto): Promise<DeliveryResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, {
      orderId: body.orderId,
      deliveryDriverId: body.deliveryDriverId,
      startDate: body.startDate,
      endDate: body.endDate,
      total: body.total,
      observations: body.observations,
    });
    return toDeliveryResponse(record);
  }

  public async updatePatch(id: number, body: PatchDeliveryDto): Promise<DeliveryResponseDto> {
    const record = await this.findOrFail(id);
    // Copia sólo los campos editables enviados; conserva los demás.
    const data: PatchDeliveryDto = {};
    if (body.orderId !== undefined) data.orderId = body.orderId;
    if (body.deliveryDriverId !== undefined) data.deliveryDriverId = body.deliveryDriverId;
    if (body.startDate !== undefined) data.startDate = body.startDate;
    if (body.endDate !== undefined) data.endDate = body.endDate;
    if (body.total !== undefined) data.total = body.total;
    if (body.observations !== undefined) data.observations = body.observations;

    await this.repository.update(record, data);
    return toDeliveryResponse(record);
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(id: number): Promise<void> {
    const record = await this.findOrFail(id, false);
    await this.repository.delete(record);
  }

  /** Eliminación lógica -> `status = inactive`. */
  public async deleteLogical(id: number): Promise<DeliveryResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, { status: "inactive" });
    return toDeliveryResponse(record);
  }

  // ================== HELPERS ==================
  /**
   * Busca por PK y falla con 404 si no existe o no está activo.
   * `onlyActive` aplica la política de borrado lógico a consultas y cambios.
   * El borrado físico lo desactiva para poder purgar registros inactivos.
   */
  private async findOrFail(id: number, onlyActive = true): Promise<Delivery> {
    const record = await this.repository.findById(id);
    if (!record || (onlyActive && record.status !== "active")) {
      throw new AppError(404, "Delivery not found");
    }
    return record;
  }
}
