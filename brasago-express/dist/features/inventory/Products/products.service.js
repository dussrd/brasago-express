"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const dto_1 = require("./dto");
const products_repository_1 = require("./products.repository");
const app_error_1 = require("../../../shared/errors/app-error");
/**
 * Capa Service del feature Products.
 *
 * Reglas de negocio: estado por defecto, borrado lógico, borrado físico y respuesta DTO.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve **DTOs** (carpeta `dto/`), nunca instancias del modelo.
 */
class ProductsService {
    constructor(repository = new products_repository_1.ProductsRepository()) {
        this.repository = repository;
    }
    // ================== READ ==================
    async getAll() {
        const records = await this.repository.findAllActive();
        return records.map((record) => (0, dto_1.toProductResponse)(record));
    }
    async getOne(id) {
        return (0, dto_1.toProductResponse)(await this.findOrFail(id));
    }
    // ================== CREATE ==================
    async create(body) {
        // Sólo los campos permitidos llegan al modelo; evita mass assignment.
        const record = await this.repository.create({
            sku: body.sku,
            name: body.name,
            description: body.description,
            price: body.price,
            status: body.status ?? "active",
        });
        return (0, dto_1.toProductResponse)(record);
    }
    // ================== UPDATE ==================
    async updatePut(id, body) {
        const record = await this.findOrFail(id);
        await this.repository.update(record, {
            sku: body.sku,
            name: body.name,
            description: body.description,
            price: body.price,
        });
        return (0, dto_1.toProductResponse)(record);
    }
    async updatePatch(id, body) {
        const record = await this.findOrFail(id);
        // Copia sólo los campos editables enviados; conserva los demás.
        const data = {};
        if (body.sku !== undefined)
            data.sku = body.sku;
        if (body.name !== undefined)
            data.name = body.name;
        if (body.description !== undefined)
            data.description = body.description;
        if (body.price !== undefined)
            data.price = body.price;
        await this.repository.update(record, data);
        return (0, dto_1.toProductResponse)(record);
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
        return (0, dto_1.toProductResponse)(record);
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
            throw new app_error_1.AppError(404, "Product not found");
        }
        return record;
    }
}
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map