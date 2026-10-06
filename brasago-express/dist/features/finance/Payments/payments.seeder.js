"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedPayments = seedPayments;
const faker_1 = require("@faker-js/faker");
const payment_model_1 = require("./payment.model");
const order_model_1 = require("../../sale/Orders/order.model");
/**
 * Seeder del feature Payments (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
async function seedPayments(count) {
    if (count <= 0) {
        console.log("⏭️  payments: count=0, se omite");
        return 0;
    }
    const existing = await payment_model_1.Payment.count();
    if (existing > 0) {
        console.log(`⏭️  payments: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const orders = await order_model_1.Order.findAll();
    if (orders.length === 0) {
        console.log("⏭️  payments: faltan registros relacionados, se omite seeder");
        return 0;
    }
    const rows = Array.from({ length: count }, (_, i) => {
        const order = faker_1.faker.helpers.arrayElement(orders);
        return {
            referenceType: "order",
            referenceId: order.id,
            method: faker_1.faker.helpers.arrayElement(["cash", "card", "transfer"]),
            amount: Number(order.total),
            date: order.date,
            status: "active",
        };
    });
    await payment_model_1.Payment.bulkCreate(rows);
    console.log(`✅ payments: insertados ${rows.length} registro(s) falsos`);
    return rows.length;
}
//# sourceMappingURL=payments.seeder.js.map