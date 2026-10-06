"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCustomers = seedCustomers;
const faker_1 = require("@faker-js/faker");
const customer_model_1 = require("./customer.model");
/**
 * Seeder del feature Customers (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
async function seedCustomers(count) {
    if (count <= 0) {
        console.log("⏭️  customers: count=0, se omite");
        return 0;
    }
    const existing = await customer_model_1.Customer.count();
    if (existing > 0) {
        console.log(`⏭️  customers: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const rows = Array.from({ length: count }, (_, i) => ({
        documentType: "CC",
        documentNumber: `${i + 1}${faker_1.faker.string.numeric(10)}`,
        name: faker_1.faker.person.fullName(),
        phone: faker_1.faker.phone.number({ style: "national" }),
        email: `customer.${i}.${faker_1.faker.string.alphanumeric(6)}@example.com`.toLowerCase(),
        status: "active",
    }));
    await customer_model_1.Customer.bulkCreate(rows);
    console.log(`✅ customers: insertados ${rows.length} registro(s) falsos`);
    return rows.length;
}
//# sourceMappingURL=customers.seeder.js.map