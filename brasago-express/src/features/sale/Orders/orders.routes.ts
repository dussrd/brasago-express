import { Application } from "express";
import { OrdersController } from "./orders.controller";

export class OrdersRoutes {
  public ordersController: OrdersController = new OrdersController();

  public routes(app: Application): void {
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
