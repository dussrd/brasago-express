import { Application } from "express";
import { DeliveriesController } from "./deliveries.controller";

export class DeliveriesRoutes {
  public deliveriesController: DeliveriesController = new DeliveriesController();

  public routes(app: Application): void {
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
