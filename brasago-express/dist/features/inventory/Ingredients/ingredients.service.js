"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientsService = void 0;
const dto_1 = require("./dto");
const ingredients_repository_1 = require("./ingredients.repository");
const app_error_1 = require("../../../shared/errors/app-error");
/**
 * Capa Service del feature Ingredients.
 *
 * Reglas de negocio: estado por defecto, borrado lógico, borrado físico y respuesta DTO.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve **DTOs** (carpeta `dto/`), nunca instancias del modelo.
 */
class IngredientsService {
    constructor(repository = new ingredients_repository_1.IngredientsRepository()) {
        this.repository = repository;
    }
    // ================== READ ==================
    async getAll() {
        const records = await this.repository.findAllActive();
        return records.map((record) => (0, dto_1.toIngredientResponse)(record));
    }
    async getOne(id) {
        return (0, dto_1.toIngredientResponse)(await this.findOrFail(id));
    }
    // ================== CREATE ==================
    async create(body) {
        // Sólo los campos permitidos llegan al modelo; evita mass assignment.
        const record = await this.repository.create({
            code: body.code,
            name: body.name,
            unitOfMeasure: body.unitOfMeasure,
            minimumStock: body.minimumStock,
            status: body.status ?? "active",
        });
        return (0, dto_1.toIngredientResponse)(record);
    }
    // ================== UPDATE ==================
    async updatePut(id, body) {
        const record = await this.findOrFail(id);
        await this.repository.update(record, {
            code: body.code,
            name: body.name,
            unitOfMeasure: body.unitOfMeasure,
            minimumStock: body.minimumStock,
        });
        return (0, dto_1.toIngredientResponse)(record);
    }
    async updatePatch(id, body) {
        const record = await this.findOrFail(id);
        // Copia sólo los campos editables enviados; conserva los demás.
        const data = {};
        if (body.code !== undefined)
            data.code = body.code;
        if (body.name !== undefined)
            data.name = body.name;
        if (body.unitOfMeasure !== undefined)
            data.unitOfMeasure = body.unitOfMeasure;
        if (body.minimumStock !== undefined)
            data.minimumStock = body.minimumStock;
        await this.repository.update(record, data);
        return (0, dto_1.toIngredientResponse)(record);
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
        return (0, dto_1.toIngredientResponse)(record);
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
            throw new app_error_1.AppError(404, "Ingredient not found");
        }
        return record;
    }
}
exports.IngredientsService = IngredientsService;
//# sourceMappingURL=ingredients.service.js.map