"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const customers_service_1 = require("./customers.service");
/**
 * Capa Controller del feature Customers.
 *
 * Traduce HTTP <-> negocio: lee `req`, llama al service y arma la respuesta.
 * No contiene reglas de negocio ni consultas a Sequelize.
 *
 * Cada método delega el manejo de errores en `run()` (ver `BaseController`):
 * así el `try/catch` no se repite en los métodos.
 */
class CustomersController extends base_controller_1.BaseController {
    constructor(service = new customers_service_1.CustomersService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(_req, res) {
        await this.run(res, async () => {
            const customers = await this.service.getAll();
            res.status(200).json({ customers });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const customer = await this.service.getOne(this.paramId(req));
            res.status(200).json({ customer });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const customer = await this.service.create(req.body);
            res.status(201).json({ customer });
        });
    }
    // ================== UPDATE ==================
    async updatePut(req, res) {
        await this.run(res, async () => {
            const customer = await this.service.updatePut(this.paramId(req), req.body);
            res.status(200).json({ customer });
        });
    }
    async updatePatch(req, res) {
        await this.run(res, async () => {
            const customer = await this.service.updatePatch(this.paramId(req), req.body);
            res.status(200).json({ customer });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.deletePhysical(id);
            res.status(200).json({ message: "Customer permanently deleted", id });
        });
    }
    /** Eliminación lógica -> `status = inactive`. */
    async deleteLogical(req, res) {
        await this.run(res, async () => {
            const customer = await this.service.deleteLogical(this.paramId(req));
            res.status(200).json({ message: "Customer deactivated (logical delete)", customer });
        });
    }
}
exports.CustomersController = CustomersController;
//# sourceMappingURL=customers.controller.js.map