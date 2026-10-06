"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const payments_service_1 = require("./payments.service");
/**
 * Capa Controller del feature Payments.
 *
 * Traduce HTTP <-> negocio: lee `req`, llama al service y arma la respuesta.
 * No contiene reglas de negocio ni consultas a Sequelize.
 *
 * Cada método delega el manejo de errores en `run()` (ver `BaseController`):
 * así el `try/catch` no se repite en los métodos.
 */
class PaymentsController extends base_controller_1.BaseController {
    constructor(service = new payments_service_1.PaymentsService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(_req, res) {
        await this.run(res, async () => {
            const payments = await this.service.getAll();
            res.status(200).json({ payments });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const payment = await this.service.getOne(this.paramId(req));
            res.status(200).json({ payment });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const payment = await this.service.create(req.body);
            res.status(201).json({ payment });
        });
    }
    // ================== UPDATE ==================
    async updatePut(req, res) {
        await this.run(res, async () => {
            const payment = await this.service.updatePut(this.paramId(req), req.body);
            res.status(200).json({ payment });
        });
    }
    async updatePatch(req, res) {
        await this.run(res, async () => {
            const payment = await this.service.updatePatch(this.paramId(req), req.body);
            res.status(200).json({ payment });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.deletePhysical(id);
            res.status(200).json({ message: "Payment permanently deleted", id });
        });
    }
    /** Eliminación lógica -> `status = inactive`. */
    async deleteLogical(req, res) {
        await this.run(res, async () => {
            const payment = await this.service.deleteLogical(this.paramId(req));
            res.status(200).json({ message: "Payment deactivated (logical delete)", payment });
        });
    }
}
exports.PaymentsController = PaymentsController;
//# sourceMappingURL=payments.controller.js.map