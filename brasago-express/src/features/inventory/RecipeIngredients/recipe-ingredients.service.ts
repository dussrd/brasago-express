import {
  RecipeIngredientResponseDto,
  CreateRecipeIngredientDto,
  PatchRecipeIngredientDto,
  UpdateRecipeIngredientDto,
  toRecipeIngredientResponse,
} from "./dto";
import { RecipeIngredientsRepository } from "./recipe-ingredients.repository";
import { RecipeIngredient } from "./recipe-ingredient.model";
import { AppError } from "../../../shared/errors/app-error";

/**
 * Capa Service del feature RecipeIngredients.
 *
 * Reglas de negocio: estado por defecto, borrado lógico, borrado físico y respuesta DTO.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve **DTOs** (carpeta `dto/`), nunca instancias del modelo.
 */
export class RecipeIngredientsService {
  public constructor(
    private readonly repository: RecipeIngredientsRepository = new RecipeIngredientsRepository()
  ) {}

  // ================== READ ==================
  public async getAll(): Promise<RecipeIngredientResponseDto[]> {
    const records = await this.repository.findAllActive();
    return records.map((record) => toRecipeIngredientResponse(record));
  }

  public async getOne(id: number): Promise<RecipeIngredientResponseDto> {
    return toRecipeIngredientResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  public async create(body: CreateRecipeIngredientDto): Promise<RecipeIngredientResponseDto> {
    // Sólo los campos permitidos llegan al modelo; evita mass assignment.
    const record = await this.repository.create({
      productId: body.productId,
      ingredientId: body.ingredientId,
      quantity: body.quantity,
      status: body.status ?? "active",
    });
    return toRecipeIngredientResponse(record);
  }

  // ================== UPDATE ==================
  public async updatePut(id: number, body: UpdateRecipeIngredientDto): Promise<RecipeIngredientResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, {
      productId: body.productId,
      ingredientId: body.ingredientId,
      quantity: body.quantity,
    });
    return toRecipeIngredientResponse(record);
  }

  public async updatePatch(id: number, body: PatchRecipeIngredientDto): Promise<RecipeIngredientResponseDto> {
    const record = await this.findOrFail(id);
    // Copia sólo los campos editables enviados; conserva los demás.
    const data: PatchRecipeIngredientDto = {};
    if (body.productId !== undefined) data.productId = body.productId;
    if (body.ingredientId !== undefined) data.ingredientId = body.ingredientId;
    if (body.quantity !== undefined) data.quantity = body.quantity;

    await this.repository.update(record, data);
    return toRecipeIngredientResponse(record);
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(id: number): Promise<void> {
    const record = await this.findOrFail(id, false);
    await this.repository.delete(record);
  }

  /** Eliminación lógica -> `status = inactive`. */
  public async deleteLogical(id: number): Promise<RecipeIngredientResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, { status: "inactive" });
    return toRecipeIngredientResponse(record);
  }

  // ================== HELPERS ==================
  /**
   * Busca por PK y falla con 404 si no existe o no está activo.
   * `onlyActive` aplica la política de borrado lógico a consultas y cambios.
   * El borrado físico lo desactiva para poder purgar registros inactivos.
   */
  private async findOrFail(id: number, onlyActive = true): Promise<RecipeIngredient> {
    const record = await this.repository.findById(id);
    if (!record || (onlyActive && record.status !== "active")) {
      throw new AppError(404, "RecipeIngredient not found");
    }
    return record;
  }
}
