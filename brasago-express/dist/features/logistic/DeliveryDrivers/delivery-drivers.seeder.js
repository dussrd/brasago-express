"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDeliveryDrivers = seedDeliveryDrivers;
const faker_1 = require("@faker-js/faker");
const delivery_driver_model_1 = require("./delivery-driver.model");
/**
 * Seeder del feature DeliveryDrivers (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
async function seedDeliveryDrivers(count) {
    if (count <= 0) {
        console.log("⏭️  delivery-drivers: count=0, se omite");
        return 0;
    }
    const existing = await delivery_driver_model_1.DeliveryDriver.count();
    if (existing > 0) {
        console.log(`⏭️  delivery-drivers: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const rows = Array.from({ length: count }, (_, i) => ({
        name: faker_1.faker.person.fullName(),
        description: faker_1.faker.lorem.sentence(),
        status: "active",
    }));
    await delivery_driver_model_1.DeliveryDriver.bulkCreate(rows);
    console.log(`✅ delivery-drivers: insertados ${rows.length} registro(s) falsos`);
    return rows.length;
}
//# sourceMappingURL=delivery-drivers.seeder.js.map