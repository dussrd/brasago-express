"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsRoutes = void 0;
const reservations_controller_1 = require("./reservations.controller");
class ReservationsRoutes {
    constructor() {
        this.reservationsController = new reservations_controller_1.ReservationsController();
    }
    routes(app) {
        // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================
        // getAll
        app
            .route("/api/reservations")
            .get(this.reservationsController.getAll.bind(this.reservationsController));
        // getOne
        app
            .route("/api/reservations/:id")
            .get(this.reservationsController.getOne.bind(this.reservationsController));
        // create
        app
            .route("/api/reservations")
            .post(this.reservationsController.create.bind(this.reservationsController));
        // update (PUT / PATCH)
        app
            .route("/api/reservations/:id")
            .put(this.reservationsController.updatePut.bind(this.reservationsController))
            .patch(this.reservationsController.updatePatch.bind(this.reservationsController));
        // delete físico
        app
            .route("/api/reservations/:id")
            .delete(this.reservationsController.deletePhysical.bind(this.reservationsController));
        // delete lógico
        app
            .route("/api/reservations/:id/deactivate")
            .patch(this.reservationsController.deleteLogical.bind(this.reservationsController));
    }
}
exports.ReservationsRoutes = ReservationsRoutes;
//# sourceMappingURL=reservations.routes.js.map