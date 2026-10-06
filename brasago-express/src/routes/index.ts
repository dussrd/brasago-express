import { PaymentsRoutes } from "../features/finance/Payments/payments.routes";
import { IngredientsRoutes } from "../features/inventory/Ingredients/ingredients.routes";
import { ProductsRoutes } from "../features/inventory/Products/products.routes";
import { RecipeIngredientsRoutes } from "../features/inventory/RecipeIngredients/recipe-ingredients.routes";
import { DeliveriesRoutes } from "../features/logistic/Deliveries/deliveries.routes";
import { DeliveryDriversRoutes } from "../features/logistic/DeliveryDrivers/delivery-drivers.routes";
import { BranchesRoutes } from "../features/operation/Branches/branches.routes";
import { ReservationsRoutes } from "../features/operation/Reservations/reservations.routes";
import { TablesRoutes } from "../features/operation/Tables/tables.routes";
import { CustomersRoutes } from "../features/sale/Customers/customers.routes";
import { OrderDetailsRoutes } from "../features/sale/OrderDetails/order-details.routes";
import { OrdersRoutes } from "../features/sale/Orders/orders.routes";

export class Routes {
  public paymentsRoutes: PaymentsRoutes = new PaymentsRoutes();
  public ordersRoutes: OrdersRoutes = new OrdersRoutes();
  public ingredientsRoutes: IngredientsRoutes = new IngredientsRoutes();
  public productsRoutes: ProductsRoutes = new ProductsRoutes();
  public recipeIngredientsRoutes: RecipeIngredientsRoutes = new RecipeIngredientsRoutes();
  public deliveriesRoutes: DeliveriesRoutes = new DeliveriesRoutes();
  public deliveryDriversRoutes: DeliveryDriversRoutes = new DeliveryDriversRoutes();
  public branchesRoutes: BranchesRoutes = new BranchesRoutes();
  public reservationsRoutes: ReservationsRoutes = new ReservationsRoutes();
  public tablesRoutes: TablesRoutes = new TablesRoutes();
  public customersRoutes: CustomersRoutes = new CustomersRoutes();
  public orderDetailsRoutes: OrderDetailsRoutes = new OrderDetailsRoutes();
}