import {
  IngredientResponseDto,
  CreateIngredientDto,
  PatchIngredientDto,
  UpdateIngredientDto,
  toIngredientResponse,
} from "./dto";
import { IngredientsRepository } from "./ingredients.repository";
import { Ingredient } from "./ingredient.model";
import { AppError } from "../../../shared/errors/app-error";

/**
 * Capa Service del feature Ingredients.
 *
 * Reglas de negocio: estado por defecto, borrado lógico, borrado físico y respuesta DTO.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve **DTOs** (carpeta `dto/`), nunca instancias del modelo.
 */
export class IngredientsService {
  public constructor(
    private readonly repository: IngredientsRepository = new IngredientsRepository()
  ) {}

  // ================== READ ==================
  public async getAll(): Promise<IngredientResponseDto[]> {
    const records = await this.repository.findAllActive();
    return records.map((record) => toIngredientResponse(record));
  }

  public async getOne(id: number): Promise<IngredientResponseDto> {
    return toIngredientResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  public async create(body: CreateIngredientDto): Promise<IngredientResponseDto> {
    // Sólo los campos permitidos llegan al modelo; evita mass assignment.
    const record = await this.repository.create({
      code: body.code,
      name: body.name,
      unitOfMeasure: body.unitOfMeasure,
      minimumStock: body.minimumStock,
      status: body.status ?? "active",
    });
    return toIngredientResponse(record);
  }

  // ================== UPDATE ==================
  public async updatePut(id: number, body: UpdateIngredientDto): Promise<IngredientResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, {
      code: body.code,
      name: body.name,
      unitOfMeasure: body.unitOfMeasure,
      minimumStock: body.minimumStock,
    });
    return toIngredientResponse(record);
  }

  public async updatePatch(id: number, body: PatchIngredientDto): Promise<IngredientResponseDto> {
    const record = await this.findOrFail(id);
    // Copia sólo los campos editables enviados; conserva los demás.
    const data: PatchIngredientDto = {};
    if (body.code !== undefined) data.code = body.code;
    if (body.name !== undefined) data.name = body.name;
    if (body.unitOfMeasure !== undefined) data.unitOfMeasure = body.unitOfMeasure;
    if (body.minimumStock !== undefined) data.minimumStock = body.minimumStock;

    await this.repository.update(record, data);
    return toIngredientResponse(record);
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(id: number): Promise<void> {
    const record = await this.findOrFail(id, false);
    await this.repository.delete(record);
  }

  /** Eliminación lógica -> `status = inactive`. */
  public async deleteLogical(id: number): Promise<IngredientResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, { status: "inactive" });
    return toIngredientResponse(record);
  }

  // ================== HELPERS ==================
  /**
   * Busca por PK y falla con 404 si no existe o no está activo.
   * `onlyActive` aplica la política de borrado lógico a consultas y cambios.
   * El borrado físico lo desactiva para poder purgar registros inactivos.
   */
  private async findOrFail(id: number, onlyActive = true): Promise<Ingredient> {
    const record = await this.repository.findById(id);
    if (!record || (onlyActive && record.status !== "active")) {
      throw new AppError(404, "Ingredient not found");
    }
    return record;
  }
}
