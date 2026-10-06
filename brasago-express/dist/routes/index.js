"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const payments_routes_1 = require("../features/finance/Payments/payments.routes");
const ingredients_routes_1 = require("../features/inventory/Ingredients/ingredients.routes");
const products_routes_1 = require("../features/inventory/Products/products.routes");
const recipe_ingredients_routes_1 = require("../features/inventory/RecipeIngredients/recipe-ingredients.routes");
const deliveries_routes_1 = require("../features/logistic/Deliveries/deliveries.routes");
const delivery_drivers_routes_1 = require("../features/logistic/DeliveryDrivers/delivery-drivers.routes");
const branches_routes_1 = require("../features/operation/Branches/branches.routes");
const reservations_routes_1 = require("../features/operation/Reservations/reservations.routes");
const tables_routes_1 = require("../features/operation/Tables/tables.routes");
const customers_routes_1 = require("../features/sale/Customers/customers.routes");
const order_details_routes_1 = require("../features/sale/OrderDetails/order-details.routes");
const orders_routes_1 = require("../features/sale/Orders/orders.routes");
class Routes {
    constructor() {
        this.paymentsRoutes = new payments_routes_1.PaymentsRoutes();
        this.ordersRoutes = new orders_routes_1.OrdersRoutes();
        this.ingredientsRoutes = new ingredients_routes_1.IngredientsRoutes();
        this.productsRoutes = new products_routes_1.ProductsRoutes();
        this.recipeIngredientsRoutes = new recipe_ingredients_routes_1.RecipeIngredientsRoutes();
        this.deliveriesRoutes = new deliveries_routes_1.DeliveriesRoutes();
        this.deliveryDriversRoutes = new delivery_drivers_routes_1.DeliveryDriversRoutes();
        this.branchesRoutes = new branches_routes_1.BranchesRoutes();
        this.reservationsRoutes = new reservations_routes_1.ReservationsRoutes();
        this.tablesRoutes = new tables_routes_1.TablesRoutes();
        this.customersRoutes = new customers_routes_1.CustomersRoutes();
        this.orderDetailsRoutes = new order_details_routes_1.OrderDetailsRoutes();
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map