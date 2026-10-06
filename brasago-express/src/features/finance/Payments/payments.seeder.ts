import { faker } from "@faker-js/faker";
import { Payment } from "./payment.model";
import { Order } from "../../sale/Orders/order.model";

/**
 * Seeder del feature Payments (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
export async function seedPayments(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  payments: count=0, se omite");
    return 0;
  }

  const existing = await Payment.count();
  if (existing > 0) {
    console.log(`⏭️  payments: ya hay ${existing} registro(s), se omite seeder`);
    return 0;
  }

  const orders = await Order.findAll();
  if (orders.length === 0) {
    console.log("⏭️  payments: faltan registros relacionados, se omite seeder");
    return 0;
  }

  const rows = Array.from({ length: count }, (_, i) => {
    const order = faker.helpers.arrayElement(orders);
    return {
    referenceType: "order",
    referenceId: order.id,
    method: faker.helpers.arrayElement(["cash", "card", "transfer"]),
    amount: Number(order.total),
    date: order.date,
    status: "active" as const,
    };
  });

  await Payment.bulkCreate(rows);
  console.log(`✅ payments: insertados ${rows.length} registro(s) falsos`);
  return rows.length;
}
