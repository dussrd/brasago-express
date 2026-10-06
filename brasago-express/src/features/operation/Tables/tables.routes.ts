import { Application } from "express";
import { TablesController } from "./tables.controller";

export class TablesRoutes {
  public tablesController: TablesController = new TablesController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================

    // getAll
    app
      .route("/api/tables")
      .get(this.tablesController.getAll.bind(this.tablesController));

    // getOne
    app
      .route("/api/tables/:id")
      .get(this.tablesController.getOne.bind(this.tablesController));

    // create
    app
      .route("/api/tables")
      .post(this.tablesController.create.bind(this.tablesController));

    // update (PUT / PATCH)
    app
      .route("/api/tables/:id")
      .put(this.tablesController.updatePut.bind(this.tablesController))
      .patch(this.tablesController.updatePatch.bind(this.tablesController));

    // delete físico
    app
      .route("/api/tables/:id")
      .delete(this.tablesController.deletePhysical.bind(this.tablesController));

    // delete lógico
    app
      .route("/api/tables/:id/deactivate")
      .patch(this.tablesController.deleteLogical.bind(this.tablesController));
  }
}
