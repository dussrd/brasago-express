import {
  OrderDetailResponseDto,
  CreateOrderDetailDto,
  PatchOrderDetailDto,
  UpdateOrderDetailDto,
  toOrderDetailResponse,
} from "./dto";
import { OrderDetailsRepository } from "./order-details.repository";
import { OrderDetail } from "./order-detail.model";
import { AppError } from "../../../shared/errors/app-error";

/**
 * Capa Service del feature OrderDetails.
 *
 * Reglas de negocio: estado por defecto, borrado lógico, borrado físico y respuesta DTO.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve **DTOs** (carpeta `dto/`), nunca instancias del modelo.
 */
export class OrderDetailsService {
  public constructor(
    private readonly repository: OrderDetailsRepository = new OrderDetailsRepository()
  ) {}

  // ================== READ ==================
  public async getAll(): Promise<OrderDetailResponseDto[]> {
    const records = await this.repository.findAllActive();
    return records.map((record) => toOrderDetailResponse(record));
  }

  public async getOne(id: number): Promise<OrderDetailResponseDto> {
    return toOrderDetailResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  public async create(body: CreateOrderDetailDto): Promise<OrderDetailResponseDto> {
    // Sólo los campos permitidos llegan al modelo; evita mass assignment.
    const record = await this.repository.create({
      orderId: body.orderId,
      productId: body.productId,
      quantity: body.quantity,
      unitValue: body.unitValue,
      total: body.total,
      observations: body.observations,
      status: body.status ?? "active",
    });
    return toOrderDetailResponse(record);
  }

  // ================== UPDATE ==================
  public async updatePut(id: number, body: UpdateOrderDetailDto): Promise<OrderDetailResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, {
      orderId: body.orderId,
      productId: body.productId,
      quantity: body.quantity,
      unitValue: body.unitValue,
      total: body.total,
      observations: body.observations,
    });
    return toOrderDetailResponse(record);
  }

  public async updatePatch(id: number, body: PatchOrderDetailDto): Promise<OrderDetailResponseDto> {
    const record = await this.findOrFail(id);
    // Copia sólo los campos editables enviados; conserva los demás.
    const data: PatchOrderDetailDto = {};
    if (body.orderId !== undefined) data.orderId = body.orderId;
    if (body.productId !== undefined) data.productId = body.productId;
    if (body.quantity !== undefined) data.quantity = body.quantity;
    if (body.unitValue !== undefined) data.unitValue = body.unitValue;
    if (body.total !== undefined) data.total = body.total;
    if (body.observations !== undefined) data.observations = body.observations;

    await this.repository.update(record, data);
    return toOrderDetailResponse(record);
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(id: number): Promise<void> {
    const record = await this.findOrFail(id, false);
    await this.repository.delete(record);
  }

  /** Eliminación lógica -> `status = inactive`. */
  public async deleteLogical(id: number): Promise<OrderDetailResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, { status: "inactive" });
    return toOrderDetailResponse(record);
  }

  // ================== HELPERS ==================
  /** Busca por PK: los inactivos no son visibles salvo para borrado físico. */
  private async findOrFail(id: number, onlyActive = true): Promise<OrderDetail> {
    const record = await this.repository.findById(id);
    if (!record || (onlyActive && record.status !== "active")) {
      throw new AppError(404, "OrderDetail not found");
    }
    return record;
  }
}
