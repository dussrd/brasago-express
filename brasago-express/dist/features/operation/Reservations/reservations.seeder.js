"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedReservations = seedReservations;
const faker_1 = require("@faker-js/faker");
const reservation_model_1 = require("./reservation.model");
const customer_model_1 = require("../../sale/Customers/customer.model");
const table_model_1 = require("../Tables/table.model");
/**
 * Seeder del feature Reservations (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
async function seedReservations(count) {
    if (count <= 0) {
        console.log("⏭️  reservations: count=0, se omite");
        return 0;
    }
    const existing = await reservation_model_1.Reservation.count();
    if (existing > 0) {
        console.log(`⏭️  reservations: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const customers = await customer_model_1.Customer.findAll();
    const tables = await table_model_1.Table.findAll();
    if (customers.length === 0 || tables.length === 0) {
        console.log("⏭️  reservations: faltan registros relacionados, se omite seeder");
        return 0;
    }
    const rows = Array.from({ length: count }, (_, i) => {
        const startDate = faker_1.faker.date.soon();
        return {
            customerId: faker_1.faker.helpers.arrayElement(customers).id,
            tableId: faker_1.faker.helpers.arrayElement(tables).id,
            startDate,
            endDate: new Date(startDate.getTime() + 60 * 60 * 1000),
            observations: faker_1.faker.lorem.sentence(),
            status: "active",
        };
    });
    await reservation_model_1.Reservation.bulkCreate(rows);
    console.log(`✅ reservations: insertados ${rows.length} registro(s) falsos`);
    return rows.length;
}
//# sourceMappingURL=reservations.seeder.js.map