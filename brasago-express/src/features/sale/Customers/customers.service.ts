import {
  CustomerResponseDto,
  CreateCustomerDto,
  PatchCustomerDto,
  UpdateCustomerDto,
  toCustomerResponse,
} from "./dto";
import { CustomersRepository } from "./customers.repository";
import { Customer } from "./customer.model";
import { AppError } from "../../../shared/errors/app-error";

/**
 * Capa Service del feature Customers.
 *
 * Reglas de negocio: estado por defecto, borrado lógico, borrado físico y respuesta DTO.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve **DTOs** (carpeta `dto/`), nunca instancias del modelo.
 */
export class CustomersService {
  public constructor(
    private readonly repository: CustomersRepository = new CustomersRepository()
  ) {}

  // ================== READ ==================
  public async getAll(): Promise<CustomerResponseDto[]> {
    const records = await this.repository.findAllActive();
    return records.map((record) => toCustomerResponse(record));
  }

  public async getOne(id: number): Promise<CustomerResponseDto> {
    return toCustomerResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  public async create(body: CreateCustomerDto): Promise<CustomerResponseDto> {
    // Sólo los campos permitidos llegan al modelo; evita mass assignment.
    const record = await this.repository.create({
      documentType: body.documentType,
      documentNumber: body.documentNumber,
      name: body.name,
      phone: body.phone,
      email: body.email,
      status: body.status ?? "active",
    });
    return toCustomerResponse(record);
  }

  // ================== UPDATE ==================
  public async updatePut(id: number, body: UpdateCustomerDto): Promise<CustomerResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, {
      documentType: body.documentType,
      documentNumber: body.documentNumber,
      name: body.name,
      phone: body.phone,
      email: body.email,
    });
    return toCustomerResponse(record);
  }

  public async updatePatch(id: number, body: PatchCustomerDto): Promise<CustomerResponseDto> {
    const record = await this.findOrFail(id);
    // Copia sólo los campos editables enviados; conserva los demás.
    const data: PatchCustomerDto = {};
    if (body.documentType !== undefined) data.documentType = body.documentType;
    if (body.documentNumber !== undefined) data.documentNumber = body.documentNumber;
    if (body.name !== undefined) data.name = body.name;
    if (body.phone !== undefined) data.phone = body.phone;
    if (body.email !== undefined) data.email = body.email;

    await this.repository.update(record, data);
    return toCustomerResponse(record);
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(id: number): Promise<void> {
    const record = await this.findOrFail(id, false);
    await this.repository.delete(record);
  }

  /** Eliminación lógica -> `status = inactive`. */
  public async deleteLogical(id: number): Promise<CustomerResponseDto> {
    const record = await this.findOrFail(id);
    await this.repository.update(record, { status: "inactive" });
    return toCustomerResponse(record);
  }

  // ================== HELPERS ==================
  /**
   * Busca por PK y falla con 404 si no existe o no está activo.
   * `onlyActive` aplica la política de borrado lógico a consultas y cambios.
   * El borrado físico lo desactiva para poder purgar registros inactivos.
   */
  private async findOrFail(id: number, onlyActive = true): Promise<Customer> {
    const record = await this.repository.findById(id);
    if (!record || (onlyActive && record.status !== "active")) {
      throw new AppError(404, "Customer not found");
    }
    return record;
  }
}
