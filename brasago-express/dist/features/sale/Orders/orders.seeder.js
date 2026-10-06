"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedOrders = seedOrders;
const faker_1 = require("@faker-js/faker");
const order_model_1 = require("./order.model");
const customer_model_1 = require("../Customers/customer.model");
const branch_model_1 = require("../../operation/Branches/branch.model");
/**
 * Seeder del feature Orders (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
async function seedOrders(count) {
    if (count <= 0) {
        console.log("⏭️  orders: count=0, se omite");
        return 0;
    }
    const existing = await order_model_1.Order.count();
    if (existing > 0) {
        console.log(`⏭️  orders: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const customers = await customer_model_1.Customer.findAll();
    const branches = await branch_model_1.Branch.findAll();
    if (customers.length === 0 || branches.length === 0) {
        console.log("⏭️  orders: faltan registros relacionados, se omite seeder");
        return 0;
    }
    const rows = Array.from({ length: count }, (_, i) => {
        const total = faker_1.faker.number.int({ min: 5000, max: 100000 });
        return {
            customerId: faker_1.faker.helpers.arrayElement(customers).id,
            branchId: faker_1.faker.helpers.arrayElement(branches).id,
            channel: faker_1.faker.helpers.arrayElement(["table", "delivery", "takeaway"]),
            date: faker_1.faker.date.recent(),
            subtotal: total,
            total,
            status: "active",
        };
    });
    await order_model_1.Order.bulkCreate(rows);
    console.log(`✅ orders: insertados ${rows.length} registro(s) falsos`);
    return rows.length;
}
//# sourceMappingURL=orders.seeder.js.map