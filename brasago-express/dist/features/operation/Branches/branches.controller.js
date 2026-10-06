"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchesController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const branches_service_1 = require("./branches.service");
/**
 * Capa Controller del feature Branches.
 *
 * Traduce HTTP <-> negocio: lee `req`, llama al service y arma la respuesta.
 * No contiene reglas de negocio ni consultas a Sequelize.
 *
 * Cada método delega el manejo de errores en `run()` (ver `BaseController`):
 * así el `try/catch` no se repite en los métodos.
 */
class BranchesController extends base_controller_1.BaseController {
    constructor(service = new branches_service_1.BranchesService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(_req, res) {
        await this.run(res, async () => {
            const branches = await this.service.getAll();
            res.status(200).json({ branches });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const branch = await this.service.getOne(this.paramId(req));
            res.status(200).json({ branch });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const branch = await this.service.create(req.body);
            res.status(201).json({ branch });
        });
    }
    // ================== UPDATE ==================
    async updatePut(req, res) {
        await this.run(res, async () => {
            const branch = await this.service.updatePut(this.paramId(req), req.body);
            res.status(200).json({ branch });
        });
    }
    async updatePatch(req, res) {
        await this.run(res, async () => {
            const branch = await this.service.updatePatch(this.paramId(req), req.body);
            res.status(200).json({ branch });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.deletePhysical(id);
            res.status(200).json({ message: "Branch permanently deleted", id });
        });
    }
    /** Eliminación lógica -> `status = inactive`. */
    async deleteLogical(req, res) {
        await this.run(res, async () => {
            const branch = await this.service.deleteLogical(this.paramId(req));
            res.status(200).json({ message: "Branch deactivated (logical delete)", branch });
        });
    }
}
exports.BranchesController = BranchesController;
//# sourceMappingURL=branches.controller.js.map