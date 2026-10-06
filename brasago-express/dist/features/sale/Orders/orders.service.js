"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const dto_1 = require("./dto");
const orders_repository_1 = require("./orders.repository");
const app_error_1 = require("../../../shared/errors/app-error");
/**
 * Capa Service del feature Orders.
 *
 * Reglas de negocio: estado por defecto, borrado lógico, borrado físico y respuesta DTO.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve **DTOs** (carpeta `dto/`), nunca instancias del modelo.
 */
class OrdersService {
    constructor(repository = new orders_repository_1.OrdersRepository()) {
        this.repository = repository;
    }
    // ================== READ ==================
    async getAll() {
        const records = await this.repository.findAll();
        return records.filter((record) => record.status === "active").map((record) => (0, dto_1.toOrderResponse)(record));
    }
    async getOne(id) {
        return (0, dto_1.toOrderResponse)(await this.findOrFail(id));
    }
    // ================== CREATE ==================
    async create(body) {
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
        return (0, dto_1.toOrderResponse)(record);
    }
    // ================== UPDATE ==================
    async updatePut(id, body) {
        const record = await this.findOrFail(id);
        await this.repository.update(record, {
            customerId: body.customerId,
            branchId: body.branchId,
            channel: body.channel,
            date: body.date,
            subtotal: body.subtotal,
            total: body.total,
        });
        return (0, dto_1.toOrderResponse)(record);
    }
    async updatePatch(id, body) {
        const record = await this.findOrFail(id);
        // Copia sólo los campos editables enviados; conserva los demás.
        const data = {};
        if (body.customerId !== undefined)
            data.customerId = body.customerId;
        if (body.branchId !== undefined)
            data.branchId = body.branchId;
        if (body.channel !== undefined)
            data.channel = body.channel;
        if (body.date !== undefined)
            data.date = body.date;
        if (body.subtotal !== undefined)
            data.subtotal = body.subtotal;
        if (body.total !== undefined)
            data.total = body.total;
        await this.repository.update(record, data);
        return (0, dto_1.toOrderResponse)(record);
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
        return (0, dto_1.toOrderResponse)(record);
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
            throw new app_error_1.AppError(404, "Order not found");
        }
        return record;
    }
}
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map