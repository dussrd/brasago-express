"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryDriversRoutes = void 0;
const delivery_drivers_controller_1 = require("./delivery-drivers.controller");
class DeliveryDriversRoutes {
    constructor() {
        this.deliveryDriversController = new delivery_drivers_controller_1.DeliveryDriversController();
    }
    routes(app) {
        // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================
        // getAll
        app
            .route("/api/delivery-drivers")
            .get(this.deliveryDriversController.getAll.bind(this.deliveryDriversController));
        // getOne
        app
            .route("/api/delivery-drivers/:id")
            .get(this.deliveryDriversController.getOne.bind(this.deliveryDriversController));
        // create
        app
            .route("/api/delivery-drivers")
            .post(this.deliveryDriversController.create.bind(this.deliveryDriversController));
        // update (PUT / PATCH)
        app
            .route("/api/delivery-drivers/:id")
            .put(this.deliveryDriversController.updatePut.bind(this.deliveryDriversController))
            .patch(this.deliveryDriversController.updatePatch.bind(this.deliveryDriversController));
        // delete físico
        app
            .route("/api/delivery-drivers/:id")
            .delete(this.deliveryDriversController.deletePhysical.bind(this.deliveryDriversController));
        // delete lógico
        app
            .route("/api/delivery-drivers/:id/deactivate")
            .patch(this.deliveryDriversController.deleteLogical.bind(this.deliveryDriversController));
    }
}
exports.DeliveryDriversRoutes = DeliveryDriversRoutes;
//# sourceMappingURL=delivery-drivers.routes.js.map