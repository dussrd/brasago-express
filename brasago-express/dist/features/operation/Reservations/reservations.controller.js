"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const reservations_service_1 = require("./reservations.service");
/**
 * Capa Controller del feature Reservations.
 *
 * Traduce HTTP <-> negocio: lee `req`, llama al service y arma la respuesta.
 * No contiene reglas de negocio ni consultas a Sequelize.
 *
 * Cada método delega el manejo de errores en `run()` (ver `BaseController`):
 * así el `try/catch` no se repite en los métodos.
 */
class ReservationsController extends base_controller_1.BaseController {
    constructor(service = new reservations_service_1.ReservationsService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(_req, res) {
        await this.run(res, async () => {
            const reservations = await this.service.getAll();
            res.status(200).json({ reservations });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const reservation = await this.service.getOne(this.paramId(req));
            res.status(200).json({ reservation });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const reservation = await this.service.create(req.body);
            res.status(201).json({ reservation });
        });
    }
    // ================== UPDATE ==================
    async updatePut(req, res) {
        await this.run(res, async () => {
            const reservation = await this.service.updatePut(this.paramId(req), req.body);
            res.status(200).json({ reservation });
        });
    }
    async updatePatch(req, res) {
        await this.run(res, async () => {
            const reservation = await this.service.updatePatch(this.paramId(req), req.body);
            res.status(200).json({ reservation });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.deletePhysical(id);
            res.status(200).json({ message: "Reservation permanently deleted", id });
        });
    }
    /** Eliminación lógica -> `status = inactive`. */
    async deleteLogical(req, res) {
        await this.run(res, async () => {
            const reservation = await this.service.deleteLogical(this.paramId(req));
            res.status(200).json({ message: "Reservation deactivated (logical delete)", reservation });
        });
    }
}
exports.ReservationsController = ReservationsController;
//# sourceMappingURL=reservations.controller.js.map