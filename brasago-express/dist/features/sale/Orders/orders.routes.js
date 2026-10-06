"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRoutes = void 0;
const orders_controller_1 = require("./orders.controller");
class OrdersRoutes {
    constructor() {
        this.ordersController = new orders_controller_1.OrdersController();
    }
    routes(app) {
        // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================
        // getAll
        app
            .route("/api/orders")
            .get(this.ordersController.getAll.bind(this.ordersController));
        // getOne
        app
            .route("/api/orders/:id")
            .get(this.ordersController.getOne.bind(this.ordersController));
        // create
        app
            .route("/api/orders")
            .post(this.ordersController.create.bind(this.ordersController));
        // update (PUT / PATCH)
        app
            .route("/api/orders/:id")
            .put(this.ordersController.updatePut.bind(this.ordersController))
            .patch(this.ordersController.updatePatch.bind(this.ordersController));
        // delete físico
        app
            .route("/api/orders/:id")
            .delete(this.ordersController.deletePhysical.bind(this.ordersController));
        // delete lógico
        app
            .route("/api/orders/:id/deactivate")
            .patch(this.ordersController.deleteLogical.bind(this.ordersController));
    }
}
exports.OrdersRoutes = OrdersRoutes;
//# sourceMappingURL=orders.routes.js.map