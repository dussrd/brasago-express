import {
  OrderResponseDto,
  CreateOrderDto,
  PatchOrderDto,
  UpdateOrderDto,
  toOrderResponse,
} from "./dto";
import { OrdersRepository } from "./orders.repository";
import { Order } from "./order.model";
import { AppError } from "../../../shared/errors/app-error";

/**
 * Capa Service del feature Orders.
 *
 * Reglas de negocio: estado por defecto, borrado lógico, borrado físico y respuesta DTO.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve **DTOs** (carpeta `dto/`), nunca instancias del modelo.
 */
export class OrdersService {
  public constructor(
    private readonly repository: OrdersRepository = new OrdersRepository()
  ) {}

  // ================== READ ==================
  public async getAll(): Promise<OrderResponseDto[]> {
    const records = await this.repository.findAll();
    return records.filter((record) => record.status === "active").map((record) => toOrderResponse(record));
  }

  public async getOne(id: number): Promise<OrderResponseDto> {
    return toOrderResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  public async create(body: CreateOrderDto): Promise<OrderResponseDto> {
    // Sólo los campos permitidos llegan al modelo; evita mass assignment.
    const record = await this.repository.create({
      customerId: body.customerId,
      branchId: body.branchId,
      channel: body.channel,
      date: body.date,
      subtotal: body.subtotal,
      total: body.total,
      status: body.status ?? "active",
    });
    return toOrderResponse(record);
  }

  // ================== UPDATE ==================
  public async updatePut(id: number, body: UpdateOrderDto): Promise<OrderResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, {
      customerId: body.customerId,
      branchId: body.branchId,
      channel: body.channel,
      date: body.date,
      subtotal: body.subtotal,
      total: body.total,
    });
    return toOrderResponse(record);
  }

  public async updatePatch(id: number, body: PatchOrderDto): Promise<OrderResponseDto> {
    const record = await this.findOrFail(id);
    // Copia sólo los campos editables enviados; conserva los demás.
    const data: PatchOrderDto = {};
    if (body.customerId !== undefined) data.customerId = body.customerId;
    if (body.branchId !== undefined) data.branchId = body.branchId;
    if (body.channel !== undefined) data.channel = body.channel;
    if (body.date !== undefined) data.date = body.date;
    if (body.subtotal !== undefined) data.subtotal = body.subtotal;
    if (body.total !== undefined) data.total = body.total;

    await this.repository.update(record, data);
    return toOrderResponse(record);
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(id: number): Promise<void> {
    const record = await this.findOrFail(id, false);
    await this.repository.delete(record);
  }

  /** Eliminación lógica -> `status = inactive`. */
  public async deleteLogical(id: number): Promise<OrderResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, { status: "inactive" });
    return toOrderResponse(record);
  }

  // ================== HELPERS ==================
  /**
   * Busca por PK y falla con 404 si no existe o no está activo.
   * `onlyActive` aplica la política de borrado lógico a consultas y cambios.
   * El borrado físico lo desactiva para poder purgar registros inactivos.
   */
  private async findOrFail(id: number, onlyActive = true): Promise<Order> {
    const record = await this.repository.findById(id);
    if (!record || (onlyActive && record.status !== "active")) {
      throw new AppError(404, "Order not found");
    }
    return record;
  }
}
