import {
  TableResponseDto,
  CreateTableDto,
  PatchTableDto,
  UpdateTableDto,
  toTableResponse,
} from "./dto";
import { TablesRepository } from "./tables.repository";
import { Table } from "./table.model";
import { AppError } from "../../../shared/errors/app-error";

/**
 * Capa Service del feature Tables.
 *
 * Reglas de negocio: estado por defecto, borrado lógico, borrado físico y respuesta DTO.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve **DTOs** (carpeta `dto/`), nunca instancias del modelo.
 */
export class TablesService {
  public constructor(
    private readonly repository: TablesRepository = new TablesRepository()
  ) {}

  // ================== READ ==================
  public async getAll(): Promise<TableResponseDto[]> {
    const records = await this.repository.findAllActive();
    return records.map((record) => toTableResponse(record));
  }

  public async getOne(id: number): Promise<TableResponseDto> {
    return toTableResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  public async create(body: CreateTableDto): Promise<TableResponseDto> {
    // Sólo los campos permitidos llegan al modelo; evita mass assignment.
    const record = await this.repository.create({
      branchId: body.branchId,
      name: body.name,
      description: body.description,
      status: body.status ?? "active",
    });
    return toTableResponse(record);
  }

  // ================== UPDATE ==================
  public async updatePut(id: number, body: UpdateTableDto): Promise<TableResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, {
      branchId: body.branchId,
      name: body.name,
      description: body.description,
    });
    return toTableResponse(record);
  }

  public async updatePatch(id: number, body: PatchTableDto): Promise<TableResponseDto> {
    const record = await this.findOrFail(id);
    // Copia sólo los campos editables enviados; conserva los demás.
    const data: PatchTableDto = {};
    if (body.branchId !== undefined) data.branchId = body.branchId;
    if (body.name !== undefined) data.name = body.name;
    if (body.description !== undefined) data.description = body.description;

    await this.repository.update(record, data);
    return toTableResponse(record);
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(id: number): Promise<void> {
    const record = await this.findOrFail(id, false);
    await this.repository.delete(record);
  }

  /** Eliminación lógica -> `status = inactive`. */
  public async deleteLogical(id: number): Promise<TableResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, { status: "inactive" });
    return toTableResponse(record);
  }

  // ================== HELPERS ==================
  /**
   * Busca por PK y falla con 404 si no existe o no está activo.
   * `onlyActive` aplica la política de borrado lógico a consultas y cambios.
   * El borrado físico lo desactiva para poder purgar registros inactivos.
   */
  private async findOrFail(id: number, onlyActive = true): Promise<Table> {
    const record = await this.repository.findById(id);
    if (!record || (onlyActive && record.status !== "active")) {
      throw new AppError(404, "Table not found");
    }
    return record;
  }
}
