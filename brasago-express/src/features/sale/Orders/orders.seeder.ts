import { faker } from "@faker-js/faker";
import { Order } from "./order.model";
import { Customer } from "../Customers/customer.model";
import { Branch } from "../../operation/Branches/branch.model";

/**
 * Seeder del feature Orders (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
export async function seedOrders(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  orders: count=0, se omite");
    return 0;
  }

  const existing = await Order.count();
  if (existing > 0) {
    console.log(`⏭️  orders: ya hay ${existing} registro(s), se omite seeder`);
    return 0;
  }

  const customers = await Customer.findAll();
  const branches = await Branch.findAll();
  if (customers.length === 0 || branches.length === 0) {
    console.log("⏭️  orders: faltan registros relacionados, se omite seeder");
    return 0;
  }

  const rows = Array.from({ length: count }, (_, i) => {
    const total = faker.number.int({ min: 5000, max: 100000 });
    return {
    customerId: faker.helpers.arrayElement(customers).id,
    branchId: faker.helpers.arrayElement(branches).id,
    channel: faker.helpers.arrayElement(["table", "delivery", "takeaway"]),
    date: faker.date.recent(),
    subtotal: total,
    total,
    status: "active" as const,
    };
  });

  await Order.bulkCreate(rows);
  console.log(`✅ orders: insertados ${rows.length} registro(s) falsos`);
  return rows.length;
}
