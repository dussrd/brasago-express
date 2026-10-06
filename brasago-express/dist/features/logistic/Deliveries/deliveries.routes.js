"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveriesRoutes = void 0;
const deliveries_controller_1 = require("./deliveries.controller");
class DeliveriesRoutes {
    constructor() {
        this.deliveriesController = new deliveries_controller_1.DeliveriesController();
    }
    routes(app) {
        // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================
        // getAll
        app
            .route("/api/deliveries")
            .get(this.deliveriesController.getAll.bind(this.deliveriesController));
        // getOne
        app
            .route("/api/deliveries/:id")
            .get(this.deliveriesController.getOne.bind(this.deliveriesController));
        // create
        app
            .route("/api/deliveries")
            .post(this.deliveriesController.create.bind(this.deliveriesController));
        // update (PUT / PATCH)
        app
            .route("/api/deliveries/:id")
            .put(this.deliveriesController.updatePut.bind(this.deliveriesController))
            .patch(this.deliveriesController.updatePatch.bind(this.deliveriesController));
        // delete físico
        app
            .route("/api/deliveries/:id")
            .delete(this.deliveriesController.deletePhysical.bind(this.deliveriesController));
        // delete lógico
        app
            .route("/api/deliveries/:id/deactivate")
            .patch(this.deliveriesController.deleteLogical.bind(this.deliveriesController));
    }
}
exports.DeliveriesRoutes = DeliveriesRoutes;
//# sourceMappingURL=deliveries.routes.js.map