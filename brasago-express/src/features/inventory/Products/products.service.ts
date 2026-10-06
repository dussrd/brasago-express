import {
  ProductResponseDto,
  CreateProductDto,
  PatchProductDto,
  UpdateProductDto,
  toProductResponse,
} from "./dto";
import { ProductsRepository } from "./products.repository";
import { Product } from "./product.model";
import { AppError } from "../../../shared/errors/app-error";

/**
 * Capa Service del feature Products.
 *
 * Reglas de negocio: estado por defecto, borrado lógico, borrado físico y respuesta DTO.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve **DTOs** (carpeta `dto/`), nunca instancias del modelo.
 */
export class ProductsService {
  public constructor(
    private readonly repository: ProductsRepository = new ProductsRepository()
  ) {}

  // ================== READ ==================
  public async getAll(): Promise<ProductResponseDto[]> {
    const records = await this.repository.findAllActive();
    return records.map((record) => toProductResponse(record));
  }

  public async getOne(id: number): Promise<ProductResponseDto> {
    return toProductResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  public async create(body: CreateProductDto): Promise<ProductResponseDto> {
    // Sólo los campos permitidos llegan al modelo; evita mass assignment.
    const record = await this.repository.create({
      sku: body.sku,
      name: body.name,
      description: body.description,
      price: body.price,
      status: body.status ?? "active",
    });
    return toProductResponse(record);
  }

  // ================== UPDATE ==================
  public async updatePut(id: number, body: UpdateProductDto): Promise<ProductResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, {
      sku: body.sku,
      name: body.name,
      description: body.description,
      price: body.price,
    });
    return toProductResponse(record);
  }

  public async updatePatch(id: number, body: PatchProductDto): Promise<ProductResponseDto> {
    const record = await this.findOrFail(id);
    // Copia sólo los campos editables enviados; conserva los demás.
    const data: PatchProductDto = {};
    if (body.sku !== undefined) data.sku = body.sku;
    if (body.name !== undefined) data.name = body.name;
    if (body.description !== undefined) data.description = body.description;
    if (body.price !== undefined) data.price = body.price;

    await this.repository.update(record, data);
    return toProductResponse(record);
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(id: number): Promise<void> {
    const record = await this.findOrFail(id, false);
    await this.repository.delete(record);
  }

  /** Eliminación lógica -> `status = inactive`. */
  public async deleteLogical(id: number): Promise<ProductResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, { status: "inactive" });
    return toProductResponse(record);
  }

  // ================== HELPERS ==================
  /**
   * Busca por PK y falla con 404 si no existe o no está activo.
   * `onlyActive` aplica la política de borrado lógico a consultas y cambios.
   * El borrado físico lo desactiva para poder purgar registros inactivos.
   */
  private async findOrFail(id: number, onlyActive = true): Promise<Product> {
    const record = await this.repository.findById(id);
    if (!record || (onlyActive && record.status !== "active")) {
      throw new AppError(404, "Product not found");
    }
    return record;
  }
}
