import {
  PaymentResponseDto,
  CreatePaymentDto,
  PatchPaymentDto,
  UpdatePaymentDto,
  toPaymentResponse,
} from "./dto";
import { PaymentsRepository } from "./payments.repository";
import { Payment } from "./payment.model";
import { AppError } from "../../../shared/errors/app-error";

/**
 * Capa Service del feature Payments.
 *
 * Reglas de negocio: estado por defecto, borrado lógico, borrado físico y respuesta DTO.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve **DTOs** (carpeta `dto/`), nunca instancias del modelo.
 */
export class PaymentsService {
  public constructor(
    private readonly repository: PaymentsRepository = new PaymentsRepository()
  ) {}

  // ================== READ ==================
  public async getAll(): Promise<PaymentResponseDto[]> {
    const records = await this.repository.findAll();
    return records.filter((record) => record.status === "active").map((record) => toPaymentResponse(record));
  }

  public async getOne(id: number): Promise<PaymentResponseDto> {
    return toPaymentResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  public async create(body: CreatePaymentDto): Promise<PaymentResponseDto> {
    // Sólo los campos permitidos llegan al modelo; evita mass assignment.
    const record = await this.repository.create({
      referenceType: body.referenceType,
      referenceId: body.referenceId,
      method: body.method,
      amount: body.amount,
      date: body.date,
      status: body.status ?? "active",
    });
    return toPaymentResponse(record);
  }

  // ================== UPDATE ==================
  public async updatePut(id: number, body: UpdatePaymentDto): Promise<PaymentResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, {
      referenceType: body.referenceType,
      referenceId: body.referenceId,
      method: body.method,
      amount: body.amount,
      date: body.date,
    });
    return toPaymentResponse(record);
  }

  public async updatePatch(id: number, body: PatchPaymentDto): Promise<PaymentResponseDto> {
    const record = await this.findOrFail(id);
    // Copia sólo los campos editables enviados; conserva los demás.
    const data: PatchPaymentDto = {};
    if (body.referenceType !== undefined) data.referenceType = body.referenceType;
    if (body.referenceId !== undefined) data.referenceId = body.referenceId;
    if (body.method !== undefined) data.method = body.method;
    if (body.amount !== undefined) data.amount = body.amount;
    if (body.date !== undefined) data.date = body.date;

    await this.repository.update(record, data);
    return toPaymentResponse(record);
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(id: number): Promise<void> {
    const record = await this.findOrFail(id, false);
    await this.repository.delete(record);
  }

  /** Eliminación lógica -> `status = inactive`. */
  public async deleteLogical(id: number): Promise<PaymentResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, { status: "inactive" });
    return toPaymentResponse(record);
  }

  // ================== HELPERS ==================
  /**
   * Busca por PK y falla con 404 si no existe o no está activo.
   * `onlyActive` aplica la política de borrado lógico a consultas y cambios.
   * El borrado físico lo desactiva para poder purgar registros inactivos.
   */
  private async findOrFail(id: number, onlyActive = true): Promise<Payment> {
    const record = await this.repository.findById(id);
    if (!record || (onlyActive && record.status !== "active")) {
      throw new AppError(404, "Payment not found");
    }
    return record;
  }
}
