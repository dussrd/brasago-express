"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeIngredientsRoutes = void 0;
const recipe_ingredients_controller_1 = require("./recipe-ingredients.controller");
class RecipeIngredientsRoutes {
    constructor() {
        this.recipeIngredientsController = new recipe_ingredients_controller_1.RecipeIngredientsController();
    }
    routes(app) {
        // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================
        // getAll
        app
            .route("/api/recipe-ingredients")
            .get(this.recipeIngredientsController.getAll.bind(this.recipeIngredientsController));
        // getOne
        app
            .route("/api/recipe-ingredients/:id")
            .get(this.recipeIngredientsController.getOne.bind(this.recipeIngredientsController));
        // create
        app
            .route("/api/recipe-ingredients")
            .post(this.recipeIngredientsController.create.bind(this.recipeIngredientsController));
        // update (PUT / PATCH)
        app
            .route("/api/recipe-ingredients/:id")
            .put(this.recipeIngredientsController.updatePut.bind(this.recipeIngredientsController))
            .patch(this.recipeIngredientsController.updatePatch.bind(this.recipeIngredientsController));
        // delete físico
        app
            .route("/api/recipe-ingredients/:id")
            .delete(this.recipeIngredientsController.deletePhysical.bind(this.recipeIngredientsController));
        // delete lógico
        app
            .route("/api/recipe-ingredients/:id/deactivate")
            .patch(this.recipeIngredientsController.deleteLogical.bind(this.recipeIngredientsController));
    }
}
exports.RecipeIngredientsRoutes = RecipeIngredientsRoutes;
//# sourceMappingURL=recipe-ingredients.routes.js.map