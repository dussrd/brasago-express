"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientsRoutes = void 0;
const ingredients_controller_1 = require("./ingredients.controller");
class IngredientsRoutes {
    constructor() {
        this.ingredientsController = new ingredients_controller_1.IngredientsController();
    }
    routes(app) {
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
exports.IngredientsRoutes = IngredientsRoutes;
//# sourceMappingURL=ingredients.routes.js.map