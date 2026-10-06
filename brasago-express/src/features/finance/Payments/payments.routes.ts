import { Application } from "express";
import { PaymentsController } from "./payments.controller";

export class PaymentsRoutes {
  public paymentsController: PaymentsController = new PaymentsController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================

    // getAll
    app
      .route("/api/payments")
      .get(this.paymentsController.getAll.bind(this.paymentsController));

    // getOne
    app
      .route("/api/payments/:id")
      .get(this.paymentsController.getOne.bind(this.paymentsController));

    // create
    app
      .route("/api/payments")
      .post(this.paymentsController.create.bind(this.paymentsController));

    // update (PUT / PATCH)
    app
      .route("/api/payments/:id")
      .put(this.paymentsController.updatePut.bind(this.paymentsController))
      .patch(this.paymentsController.updatePatch.bind(this.paymentsController));

    // delete físico
    app
      .route("/api/payments/:id")
      .delete(this.paymentsController.deletePhysical.bind(this.paymentsController));

    // delete lógico
    app
      .route("/api/payments/:id/deactivate")
      .patch(this.paymentsController.deleteLogical.bind(this.paymentsController));
  }
}
