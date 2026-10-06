"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetailsRoutes = void 0;
const order_details_controller_1 = require("./order-details.controller");
class OrderDetailsRoutes {
    constructor() {
        this.orderDetailsController = new order_details_controller_1.OrderDetailsController();
    }
    routes(app) {
        // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================
        // getAll
        app
            .route("/api/order-details")
            .get(this.orderDetailsController.getAll.bind(this.orderDetailsController));
        // getOne
        app
            .route("/api/order-details/:id")
            .get(this.orderDetailsController.getOne.bind(this.orderDetailsController));
        // create
        app
            .route("/api/order-details")
            .post(this.orderDetailsController.create.bind(this.orderDetailsController));
        // update (PUT / PATCH)
        app
            .route("/api/order-details/:id")
            .put(this.orderDetailsController.updatePut.bind(this.orderDetailsController))
            .patch(this.orderDetailsController.updatePatch.bind(this.orderDetailsController));
        // delete físico
        app
            .route("/api/order-details/:id")
            .delete(this.orderDetailsController.deletePhysical.bind(this.orderDetailsController));
        // delete lógico
        app
            .route("/api/order-details/:id/deactivate")
            .patch(this.orderDetailsController.deleteLogical.bind(this.orderDetailsController));
    }
}
exports.OrderDetailsRoutes = OrderDetailsRoutes;
//# sourceMappingURL=order-details.routes.js.map