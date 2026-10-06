"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetailsController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const order_details_service_1 = require("./order-details.service");
/**
 * Capa Controller del feature OrderDetails.
 *
 * Traduce HTTP <-> negocio: lee `req`, llama al service y arma la respuesta.
 * No contiene reglas de negocio ni consultas a Sequelize.
 *
 * Cada método delega el manejo de errores en `run()` (ver `BaseController`):
 * así el `try/catch` no se repite en los métodos.
 */
class OrderDetailsController extends base_controller_1.BaseController {
    constructor(service = new order_details_service_1.OrderDetailsService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(_req, res) {
        await this.run(res, async () => {
            const orderDetails = await this.service.getAll();
            res.status(200).json({ orderDetails });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const orderDetail = await this.service.getOne(this.paramId(req));
            res.status(200).json({ orderDetail });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const orderDetail = await this.service.create(req.body);
            res.status(201).json({ orderDetail });
        });
    }
    // ================== UPDATE ==================
    async updatePut(req, res) {
        await this.run(res, async () => {
            const orderDetail = await this.service.updatePut(this.paramId(req), req.body);
            res.status(200).json({ orderDetail });
        });
    }
    async updatePatch(req, res) {
        await this.run(res, async () => {
            const orderDetail = await this.service.updatePatch(this.paramId(req), req.body);
            res.status(200).json({ orderDetail });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.deletePhysical(id);
            res.status(200).json({ message: "OrderDetail permanently deleted", id });
        });
    }
    /** Eliminación lógica -> `status = inactive`. */
    async deleteLogical(req, res) {
        await this.run(res, async () => {
            const orderDetail = await this.service.deleteLogical(this.paramId(req));
            res.status(200).json({ message: "OrderDetail deactivated (logical delete)", orderDetail });
        });
    }
}
exports.OrderDetailsController = OrderDetailsController;
//# sourceMappingURL=order-details.controller.js.map