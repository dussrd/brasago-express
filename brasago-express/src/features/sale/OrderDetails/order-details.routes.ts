import { Application } from "express";
import { OrderDetailsController } from "./order-details.controller";

export class OrderDetailsRoutes {
  public orderDetailsController: OrderDetailsController = new OrderDetailsController();

  public routes(app: Application): void {
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
