import { Application } from "express";
import { BranchesController } from "./branches.controller";

export class BranchesRoutes {
  public branchesController: BranchesController = new BranchesController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================

    // getAll
    app
      .route("/api/branches")
      .get(this.branchesController.getAll.bind(this.branchesController));

    // getOne
    app
      .route("/api/branches/:id")
      .get(this.branchesController.getOne.bind(this.branchesController));

    // create
    app
      .route("/api/branches")
      .post(this.branchesController.create.bind(this.branchesController));

    // update (PUT / PATCH)
    app
      .route("/api/branches/:id")
      .put(this.branchesController.updatePut.bind(this.branchesController))
      .patch(this.branchesController.updatePatch.bind(this.branchesController));

    // delete físico
    app
      .route("/api/branches/:id")
      .delete(this.branchesController.deletePhysical.bind(this.branchesController));

    // delete lógico
    app
      .route("/api/branches/:id/deactivate")
      .patch(this.branchesController.deleteLogical.bind(this.branchesController));
  }
}
