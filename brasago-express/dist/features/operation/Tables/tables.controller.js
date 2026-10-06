"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablesController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const tables_service_1 = require("./tables.service");
/**
 * Capa Controller del feature Tables.
 *
 * Traduce HTTP <-> negocio: lee `req`, llama al service y arma la respuesta.
 * No contiene reglas de negocio ni consultas a Sequelize.
 *
 * Cada método delega el manejo de errores en `run()` (ver `BaseController`):
 * así el `try/catch` no se repite en los métodos.
 */
class TablesController extends base_controller_1.BaseController {
    constructor(service = new tables_service_1.TablesService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(_req, res) {
        await this.run(res, async () => {
            const tables = await this.service.getAll();
            res.status(200).json({ tables });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const table = await this.service.getOne(this.paramId(req));
            res.status(200).json({ table });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const table = await this.service.create(req.body);
            res.status(201).json({ table });
        });
    }
    // ================== UPDATE ==================
    async updatePut(req, res) {
        await this.run(res, async () => {
            const table = await this.service.updatePut(this.paramId(req), req.body);
            res.status(200).json({ table });
        });
    }
    async updatePatch(req, res) {
        await this.run(res, async () => {
            const table = await this.service.updatePatch(this.paramId(req), req.body);
            res.status(200).json({ table });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.deletePhysical(id);
            res.status(200).json({ message: "Table permanently deleted", id });
        });
    }
    /** Eliminación lógica -> `status = inactive`. */
    async deleteLogical(req, res) {
        await this.run(res, async () => {
            const table = await this.service.deleteLogical(this.paramId(req));
            res.status(200).json({ message: "Table deactivated (logical delete)", table });
        });
    }
}
exports.TablesController = TablesController;
//# sourceMappingURL=tables.controller.js.map