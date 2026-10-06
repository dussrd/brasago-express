import { faker } from "@faker-js/faker";
import { Delivery } from "./delivery.model";
import { Order } from "../../sale/Orders/order.model";
import { DeliveryDriver } from "../DeliveryDrivers/delivery-driver.model";

/**
 * Seeder del feature Deliveries (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
export async function seedDeliveries(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  deliveries: count=0, se omite");
    return 0;
  }

  const existing = await Delivery.count();
  if (existing > 0) {
    console.log(`⏭️  deliveries: ya hay ${existing} registro(s), se omite seeder`);
    return 0;
  }

  const orders = await Order.findAll();
  const deliveryDrivers = await DeliveryDriver.findAll();
  if (orders.length === 0 || deliveryDrivers.length === 0) {
    console.log("⏭️  deliveries: faltan registros relacionados, se omite seeder");
    return 0;
  }

  const insertCount = Math.min(count, orders.length);

  const rows = Array.from({ length: insertCount }, (_, i) => {
    const startDate = faker.date.recent();
    return {
    orderId: orders[i].id,
    deliveryDriverId: faker.helpers.arrayElement(deliveryDrivers).id,
    startDate,
    endDate: new Date(startDate.getTime() + 30 * 60 * 1000),
    total: faker.number.int({ min: 3000, max: 10000 }),
    observations: faker.lorem.sentence(),
    status: "active" as const,
    };
  });

  await Delivery.bulkCreate(rows);
  console.log(`✅ deliveries: insertados ${rows.length} registro(s) falsos`);
  return rows.length;
}
