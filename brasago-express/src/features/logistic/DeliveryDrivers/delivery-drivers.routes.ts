import { Application } from "express";
import { DeliveryDriversController } from "./delivery-drivers.controller";

export class DeliveryDriversRoutes {
  public deliveryDriversController: DeliveryDriversController = new DeliveryDriversController();

  public routes(app: Application): void {
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
