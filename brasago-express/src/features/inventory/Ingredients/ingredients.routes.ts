import { Application } from "express";
import { IngredientsController } from "./ingredients.controller";

export class IngredientsRoutes {
  public ingredientsController: IngredientsController = new IngredientsController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================

    // getAll
    app
      .route("/api/ingredients")
      .get(this.ingredientsController.getAll.bind(this.ingredientsController));

    // getOne
    app
      .route("/api/ingredients/:id")
      .get(this.ingredientsController.getOne.bind(this.ingredientsController));

    // create
    app
      .route("/api/ingredients")
      .post(this.ingredientsController.create.bind(this.ingredientsController));

    // update (PUT / PATCH)
    app
      .route("/api/ingredients/:id")
      .put(this.ingredientsController.updatePut.bind(this.ingredientsController))
      .patch(this.ingredientsController.updatePatch.bind(this.ingredientsController));

    // delete físico
    app
      .route("/api/ingredients/:id")
      .delete(this.ingredientsController.deletePhysical.bind(this.ingredientsController));

    // delete lógico
    app
      .route("/api/ingredients/:id/deactivate")
      .patch(this.ingredientsController.deleteLogical.bind(this.ingredientsController));
  }
}
