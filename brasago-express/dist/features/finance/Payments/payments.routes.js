"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsRoutes = void 0;
const payments_controller_1 = require("./payments.controller");
class PaymentsRoutes {
    constructor() {
        this.paymentsController = new payments_controller_1.PaymentsController();
    }
    routes(app) {
        // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================
        // getAll
        app
            .route("/api/payments")
            .get(this.paymentsController.getAll.bind(this.paymentsController));
        // getOne
        app
            .route("/api/payments/:id")
            .get(this.paymentsController.getOne.bind(this.paymentsController));
        // create
        app
            .route("/api/payments")
            .post(this.paymentsController.create.bind(this.paymentsController));
        // update (PUT / PATCH)
        app
            .route("/api/payments/:id")
            .put(this.paymentsController.updatePut.bind(this.paymentsController))
            .patch(this.paymentsController.updatePatch.bind(this.paymentsController));
        // delete físico
        app
            .route("/api/payments/:id")
            .delete(this.paymentsController.deletePhysical.bind(this.paymentsController));
        // delete lógico
        app
            .route("/api/payments/:id/deactivate")
            .patch(this.paymentsController.deleteLogical.bind(this.paymentsController));
    }
}
exports.PaymentsRoutes = PaymentsRoutes;
//# sourceMappingURL=payments.routes.js.map