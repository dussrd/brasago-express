"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRoutes = void 0;
const products_controller_1 = require("./products.controller");
class ProductsRoutes {
    constructor() {
        this.productsController = new products_controller_1.ProductsController();
    }
    routes(app) {
        // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================
        // getAll
        app
            .route("/api/products")
            .get(this.productsController.getAll.bind(this.productsController));
        // getOne
        app
            .route("/api/products/:id")
            .get(this.productsController.getOne.bind(this.productsController));
        // create
        app
            .route("/api/products")
            .post(this.productsController.create.bind(this.productsController));
        // update (PUT / PATCH)
        app
            .route("/api/products/:id")
            .put(this.productsController.updatePut.bind(this.productsController))
            .patch(this.productsController.updatePatch.bind(this.productsController));
        // delete físico
        app
            .route("/api/products/:id")
            .delete(this.productsController.deletePhysical.bind(this.productsController));
        // delete lógico
        app
            .route("/api/products/:id/deactivate")
            .patch(this.productsController.deleteLogical.bind(this.productsController));
    }
}
exports.ProductsRoutes = ProductsRoutes;
//# sourceMappingURL=products.routes.js.map