"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const orders_service_1 = require("./orders.service");
/**
 * Capa Controller del feature Orders.
 *
 * Traduce HTTP <-> negocio: lee `req`, llama al service y arma la respuesta.
 * No contiene reglas de negocio ni consultas a Sequelize.
 *
 * Cada método delega el manejo de errores en `run()` (ver `BaseController`):
 * así el `try/catch` no se repite en los métodos.
 */
class OrdersController extends base_controller_1.BaseController {
    constructor(service = new orders_service_1.OrdersService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(_req, res) {
        await this.run(res, async () => {
            const orders = await this.service.getAll();
            res.status(200).json({ orders });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const order = await this.service.getOne(this.paramId(req));
            res.status(200).json({ order });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const order = await this.service.create(req.body);
            res.status(201).json({ order });
        });
    }
    // ================== UPDATE ==================
    async updatePut(req, res) {
        await this.run(res, async () => {
            const order = await this.service.updatePut(this.paramId(req), req.body);
            res.status(200).json({ order });
        });
    }
    async updatePatch(req, res) {
        await this.run(res, async () => {
            const order = await this.service.updatePatch(this.paramId(req), req.body);
            res.status(200).json({ order });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.deletePhysical(id);
            res.status(200).json({ message: "Order permanently deleted", id });
        });
    }
    /** Eliminación lógica -> `status = inactive`. */
    async deleteLogical(req, res) {
        await this.run(res, async () => {
            const order = await this.service.deleteLogical(this.paramId(req));
            res.status(200).json({ message: "Order deactivated (logical delete)", order });
        });
    }
}
exports.OrdersController = OrdersController;
//# sourceMappingURL=orders.controller.js.map