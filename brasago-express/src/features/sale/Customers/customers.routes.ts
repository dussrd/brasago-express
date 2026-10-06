import { Application } from "express";
import { CustomersController } from "./customers.controller";

export class CustomersRoutes {
  public customersController: CustomersController = new CustomersController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================

    // getAll
    app
      .route("/api/customers")
      .get(this.customersController.getAll.bind(this.customersController));

    // getOne
    app
      .route("/api/customers/:id")
      .get(this.customersController.getOne.bind(this.customersController));

    // create
    app
      .route("/api/customers")
      .post(this.customersController.create.bind(this.customersController));

    // update (PUT / PATCH)
    app
      .route("/api/customers/:id")
      .put(this.customersController.updatePut.bind(this.customersController))
      .patch(this.customersController.updatePatch.bind(this.customersController));

    // delete físico
    app
      .route("/api/customers/:id")
      .delete(this.customersController.deletePhysical.bind(this.customersController));

    // delete lógico
    app
      .route("/api/customers/:id/deactivate")
      .patch(this.customersController.deleteLogical.bind(this.customersController));
  }
}
