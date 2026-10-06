"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsService = void 0;
const dto_1 = require("./dto");
const reservations_repository_1 = require("./reservations.repository");
const app_error_1 = require("../../../shared/errors/app-error");
/**
 * Capa Service del feature Reservations.
 *
 * Reglas de negocio: estado por defecto, borrado lógico, borrado físico y respuesta DTO.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve **DTOs** (carpeta `dto/`), nunca instancias del modelo.
 */
class ReservationsService {
    constructor(repository = new reservations_repository_1.ReservationsRepository()) {
        this.repository = repository;
    }
    // ================== READ ==================
    async getAll() {
        const records = await this.repository.findAll();
        return records.filter((record) => record.status === "active").map((record) => (0, dto_1.toReservationResponse)(record));
    }
    async getOne(id) {
        return (0, dto_1.toReservationResponse)(await this.findOrFail(id));
    }
    // ================== CREATE ==================
    async create(body) {
        // Sólo los campos permitidos llegan al modelo; evita mass assignment.
        const record = await this.repository.create({
            customerId: body.customerId,
            tableId: body.tableId,
            startDate: body.startDate,
            endDate: body.endDate,
            observations: body.observations,
            status: body.status ?? "active",
        });
        return (0, dto_1.toReservationResponse)(record);
    }
    // ================== UPDATE ==================
    async updatePut(id, body) {
        const record = await this.findOrFail(id);
        await this.repository.update(record, {
            customerId: body.customerId,
            tableId: body.tableId,
            startDate: body.startDate,
            endDate: body.endDate,
            observations: body.observations,
        });
        return (0, dto_1.toReservationResponse)(record);
    }
    async updatePatch(id, body) {
        const record = await this.findOrFail(id);
        // Copia sólo los campos editables enviados; conserva los demás.
        const data = {};
        if (body.customerId !== undefined)
            data.customerId = body.customerId;
        if (body.tableId !== undefined)
            data.tableId = body.tableId;
        if (body.startDate !== undefined)
            data.startDate = body.startDate;
        if (body.endDate !== undefined)
            data.endDate = body.endDate;
        if (body.observations !== undefined)
            data.observations = body.observations;
        await this.repository.update(record, data);
        return (0, dto_1.toReservationResponse)(record);
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
        return (0, dto_1.toReservationResponse)(record);
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
            throw new app_error_1.AppError(404, "Reservation not found");
        }
        return record;
    }
}
exports.ReservationsService = ReservationsService;
//# sourceMappingURL=reservations.service.js.map