import { faker } from "@faker-js/faker";
import { OrderDetail } from "./order-detail.model";
import { Order } from "../Orders/order.model";
import { Product } from "../../inventory/Products/product.model";

/**
 * Seeder del feature OrderDetails (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
export async function seedOrderDetails(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  order-details: count=0, se omite");
    return 0;
  }

  const existing = await OrderDetail.count();
  if (existing > 0) {
    console.log(`⏭️  order-details: ya hay ${existing} registro(s), se omite seeder`);
    return 0;
  }

  const orders = await Order.findAll();
  const products = await Product.findAll();
  if (orders.length === 0 || products.length === 0) {
    console.log("⏭️  order-details: faltan registros relacionados, se omite seeder");
    return 0;
  }

  const rows = Array.from({ length: count }, (_, i) => {
    const product = faker.helpers.arrayElement(products);
    const quantity = faker.number.int({ min: 1, max: 5 });
    const unitValue = Number(product.price);
    return {
    orderId: faker.helpers.arrayElement(orders).id,
    productId: product.id,
    quantity,
    unitValue,
    total: quantity * unitValue,
    observations: faker.lorem.sentence(),
    status: "active" as const,
    };
  });

  await OrderDetail.bulkCreate(rows);
  console.log(`✅ order-details: insertados ${rows.length} registro(s) falsos`);
  return rows.length;
}
