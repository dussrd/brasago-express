"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersService = void 0;
const dto_1 = require("./dto");
const customers_repository_1 = require("./customers.repository");
const app_error_1 = require("../../../shared/errors/app-error");
/**
 * Capa Service del feature Customers.
 *
 * Reglas de negocio: estado por defecto, borrado lógico, borrado físico y respuesta DTO.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve **DTOs** (carpeta `dto/`), nunca instancias del modelo.
 */
class CustomersService {
    constructor(repository = new customers_repository_1.CustomersRepository()) {
        this.repository = repository;
    }
    // ================== READ ==================
    async getAll() {
        const records = await this.repository.findAllActive();
        return records.map((record) => (0, dto_1.toCustomerResponse)(record));
    }
    async getOne(id) {
        return (0, dto_1.toCustomerResponse)(await this.findOrFail(id));
    }
    // ================== CREATE ==================
    async create(body) {
        // Sólo los campos permitidos llegan al modelo; evita mass assignment.
        const record = await this.repository.create({
            documentType: body.documentType,
            documentNumber: body.documentNumber,
            name: body.name,
            phone: body.phone,
            email: body.email,
            status: body.status ?? "active",
        });
        return (0, dto_1.toCustomerResponse)(record);
    }
    // ================== UPDATE ==================
    async updatePut(id, body) {
        const record = await this.findOrFail(id);
        await this.repository.update(record, {
            documentType: body.documentType,
            documentNumber: body.documentNumber,
            name: body.name,
            phone: body.phone,
            email: body.email,
        });
        return (0, dto_1.toCustomerResponse)(record);
    }
    async updatePatch(id, body) {
        const record = await this.findOrFail(id);
        // Copia sólo los campos editables enviados; conserva los demás.
        const data = {};
        if (body.documentType !== undefined)
            data.documentType = body.documentType;
        if (body.documentNumber !== undefined)
            data.documentNumber = body.documentNumber;
        if (body.name !== undefined)
            data.name = body.name;
        if (body.phone !== undefined)
            data.phone = body.phone;
        if (body.email !== undefined)
            data.email = body.email;
        await this.repository.update(record, data);
        return (0, dto_1.toCustomerResponse)(record);
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(id) {
        const record = await this.findOrFail(id, false);
        await this.repository.delete(record);
    }
    /** Eliminación lógica -> `status = inactive`. */
    async deleteLogical(id) {
        const record = await this.findOrFail(id);
        await this.repository.update(record, { status: "inactive" });
        return (0, dto_1.toCustomerResponse)(record);
    }
    // ================== HELPERS ==================
    /**
     * Busca por PK y falla con 404 si no existe o no está activo.
     * `onlyActive` aplica la política de borrado lógico a consultas y cambios.
     * El borrado físico lo desactiva para poder purgar registros inactivos.
     */
    async findOrFail(id, onlyActive = true) {
        const record = await this.repository.findById(id);
        if (!record || (onlyActive && record.status !== "active")) {
            throw new app_error_1.AppError(404, "Customer not found");
        }
        return record;
    }
}
exports.CustomersService = CustomersService;
//# sourceMappingURL=customers.service.js.map