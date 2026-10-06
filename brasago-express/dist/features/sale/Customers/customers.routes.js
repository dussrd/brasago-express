"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersRoutes = void 0;
const customers_controller_1 = require("./customers.controller");
class CustomersRoutes {
    constructor() {
        this.customersController = new customers_controller_1.CustomersController();
    }
    routes(app) {
        // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================
        // getAll
        app
            .route("/api/customers")
            .get(this.customersController.getAll.bind(this.customersController));
        // getOne
        app
            .route("/api/customers/:id")
            .get(this.customersController.getOne.bind(this.customersController));
        // create
        app
            .route("/api/customers")
            .post(this.customersController.create.bind(this.customersController));
        // update (PUT / PATCH)
        app
            .route("/api/customers/:id")
            .put(this.customersController.updatePut.bind(this.customersController))
            .patch(this.customersController.updatePatch.bind(this.customersController));
        // delete físico
        app
            .route("/api/customers/:id")
            .delete(this.customersController.deletePhysical.bind(this.customersController));
        // delete lógico
        app
            .route("/api/customers/:id/deactivate")
            .patch(this.customersController.deleteLogical.bind(this.customersController));
    }
}
exports.CustomersRoutes = CustomersRoutes;
//# sourceMappingURL=customers.routes.js.map