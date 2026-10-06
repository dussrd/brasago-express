import { Application } from "express";
import { ReservationsController } from "./reservations.controller";

export class ReservationsRoutes {
  public reservationsController: ReservationsController = new ReservationsController();

  public routes(app: Application): void {
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
