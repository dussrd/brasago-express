"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientsController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const ingredients_service_1 = require("./ingredients.service");
/**
 * Capa Controller del feature Ingredients.
 *
 * Traduce HTTP <-> negocio: lee `req`, llama al service y arma la respuesta.
 * No contiene reglas de negocio ni consultas a Sequelize.
 *
 * Cada método delega el manejo de errores en `run()` (ver `BaseController`):
 * así el `try/catch` no se repite en los métodos.
 */
class IngredientsController extends base_controller_1.BaseController {
    constructor(service = new ingredients_service_1.IngredientsService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(_req, res) {
        await this.run(res, async () => {
            const ingredients = await this.service.getAll();
            res.status(200).json({ ingredients });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const ingredient = await this.service.getOne(this.paramId(req));
            res.status(200).json({ ingredient });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const ingredient = await this.service.create(req.body);
            res.status(201).json({ ingredient });
        });
    }
    // ================== UPDATE ==================
    async updatePut(req, res) {
        await this.run(res, async () => {
            const ingredient = await this.service.updatePut(this.paramId(req), req.body);
            res.status(200).json({ ingredient });
        });
    }
    async updatePatch(req, res) {
        await this.run(res, async () => {
            const ingredient = await this.service.updatePatch(this.paramId(req), req.body);
            res.status(200).json({ ingredient });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.deletePhysical(id);
            res.status(200).json({ message: "Ingredient permanently deleted", id });
        });
    }
    /** Eliminación lógica -> `status = inactive`. */
    async deleteLogical(req, res) {
        await this.run(res, async () => {
            const ingredient = await this.service.deleteLogical(this.paramId(req));
            res.status(200).json({ message: "Ingredient deactivated (logical delete)", ingredient });
        });
    }
}
exports.IngredientsController = IngredientsController;
//# sourceMappingURL=ingredients.controller.js.map