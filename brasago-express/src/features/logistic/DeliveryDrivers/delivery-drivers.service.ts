import {
  DeliveryDriverResponseDto,
  CreateDeliveryDriverDto,
  PatchDeliveryDriverDto,
  UpdateDeliveryDriverDto,
  toDeliveryDriverResponse,
} from "./dto";
import { DeliveryDriversRepository } from "./delivery-drivers.repository";
import { DeliveryDriver } from "./delivery-driver.model";
import { AppError } from "../../../shared/errors/app-error";

/**
 * Capa Service del feature DeliveryDrivers.
 *
 * Reglas de negocio: estado por defecto, borrado lógico, borrado físico y respuesta DTO.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve **DTOs** (carpeta `dto/`), nunca instancias del modelo.
 */
export class DeliveryDriversService {
  public constructor(
    private readonly repository: DeliveryDriversRepository = new DeliveryDriversRepository()
  ) {}

  // ================== READ ==================
  public async getAll(): Promise<DeliveryDriverResponseDto[]> {
    const records = await this.repository.findAllActive();
    return records.map((record) => toDeliveryDriverResponse(record));
  }

  public async getOne(id: number): Promise<DeliveryDriverResponseDto> {
    return toDeliveryDriverResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  public async create(body: CreateDeliveryDriverDto): Promise<DeliveryDriverResponseDto> {
    // Sólo los campos permitidos llegan al modelo; evita mass assignment.
    const record = await this.repository.create({
      name: body.name,
      description: body.description,
      status: body.status ?? "active",
    });
    return toDeliveryDriverResponse(record);
  }

  // ================== UPDATE ==================
  public async updatePut(id: number, body: UpdateDeliveryDriverDto): Promise<DeliveryDriverResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, {
      name: body.name,
      description: body.description,
    });
    return toDeliveryDriverResponse(record);
  }

  public async updatePatch(id: number, body: PatchDeliveryDriverDto): Promise<DeliveryDriverResponseDto> {
    const record = await this.findOrFail(id);
    // Copia sólo los campos editables enviados; conserva los demás.
    const data: PatchDeliveryDriverDto = {};
    if (body.name !== undefined) data.name = body.name;
    if (body.description !== undefined) data.description = body.description;

    await this.repository.update(record, data);
    return toDeliveryDriverResponse(record);
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(id: number): Promise<void> {
    const record = await this.findOrFail(id, false);
    await this.repository.delete(record);
  }

  /** Eliminación lógica -> `status = inactive`. */
  public async deleteLogical(id: number): Promise<DeliveryDriverResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, { status: "inactive" });
    return toDeliveryDriverResponse(record);
  }

  // ================== HELPERS ==================
  /**
   * Busca por PK y falla con 404 si no existe o no está activo.
   * `onlyActive` aplica la política de borrado lógico a consultas y cambios.
   * El borrado físico lo desactiva para poder purgar registros inactivos.
   */
  private async findOrFail(id: number, onlyActive = true): Promise<DeliveryDriver> {
    const record = await this.repository.findById(id);
    if (!record || (onlyActive && record.status !== "active")) {
      throw new AppError(404, "DeliveryDriver not found");
    }
    return record;
  }
}
