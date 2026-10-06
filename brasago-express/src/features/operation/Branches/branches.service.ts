import {
  BranchResponseDto,
  CreateBranchDto,
  PatchBranchDto,
  UpdateBranchDto,
  toBranchResponse,
} from "./dto";
import { BranchesRepository } from "./branches.repository";
import { Branch } from "./branch.model";
import { AppError } from "../../../shared/errors/app-error";

/**
 * Capa Service del feature Branches.
 *
 * Reglas de negocio: estado por defecto, borrado lógico, borrado físico y respuesta DTO.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve **DTOs** (carpeta `dto/`), nunca instancias del modelo.
 */
export class BranchesService {
  public constructor(
    private readonly repository: BranchesRepository = new BranchesRepository()
  ) {}

  // ================== READ ==================
  public async getAll(): Promise<BranchResponseDto[]> {
    const records = await this.repository.findAllActive();
    return records.map((record) => toBranchResponse(record));
  }

  public async getOne(id: number): Promise<BranchResponseDto> {
    return toBranchResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  public async create(body: CreateBranchDto): Promise<BranchResponseDto> {
    // Sólo los campos permitidos llegan al modelo; evita mass assignment.
    const record = await this.repository.create({
      name: body.name,
      description: body.description,
      status: body.status ?? "active",
    });
    return toBranchResponse(record);
  }

  // ================== UPDATE ==================
  public async updatePut(id: number, body: UpdateBranchDto): Promise<BranchResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, {
      name: body.name,
      description: body.description,
    });
    return toBranchResponse(record);
  }

  public async updatePatch(id: number, body: PatchBranchDto): Promise<BranchResponseDto> {
    const record = await this.findOrFail(id);
    // Copia sólo los campos editables enviados; conserva los demás.
    const data: PatchBranchDto = {};
    if (body.name !== undefined) data.name = body.name;
    if (body.description !== undefined) data.description = body.description;

    await this.repository.update(record, data);
    return toBranchResponse(record);
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(id: number): Promise<void> {
    const record = await this.findOrFail(id, false);
    await this.repository.delete(record);
  }

  /** Eliminación lógica -> `status = inactive`. */
  public async deleteLogical(id: number): Promise<BranchResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, { status: "inactive" });
    return toBranchResponse(record);
  }

  // ================== HELPERS ==================
  /**
   * Busca por PK y falla con 404 si no existe o no está activo.
   * `onlyActive` aplica la política de borrado lógico a consultas y cambios.
   * El borrado físico lo desactiva para poder purgar registros inactivos.
   */
  private async findOrFail(id: number, onlyActive = true): Promise<Branch> {
    const record = await this.repository.findById(id);
    if (!record || (onlyActive && record.status !== "active")) {
      throw new AppError(404, "Branch not found");
    }
    return record;
  }
}
