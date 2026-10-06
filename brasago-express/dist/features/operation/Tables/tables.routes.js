"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablesRoutes = void 0;
const tables_controller_1 = require("./tables.controller");
class TablesRoutes {
    constructor() {
        this.tablesController = new tables_controller_1.TablesController();
    }
    routes(app) {
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
exports.TablesRoutes = TablesRoutes;
//# sourceMappingURL=tables.routes.js.map