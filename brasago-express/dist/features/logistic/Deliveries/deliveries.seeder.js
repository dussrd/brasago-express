"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDeliveries = seedDeliveries;
const faker_1 = require("@faker-js/faker");
const delivery_model_1 = require("./delivery.model");
const order_model_1 = require("../../sale/Orders/order.model");
const delivery_driver_model_1 = require("../DeliveryDrivers/delivery-driver.model");
/**
 * Seeder del feature Deliveries (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
async function seedDeliveries(count) {
    if (count <= 0) {
        console.log("⏭️  deliveries: count=0, se omite");
        return 0;
    }
    const existing = await delivery_model_1.Delivery.count();
    if (existing > 0) {
        console.log(`⏭️  deliveries: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const orders = await order_model_1.Order.findAll();
    const deliveryDrivers = await delivery_driver_model_1.DeliveryDriver.findAll();
    if (orders.length === 0 || deliveryDrivers.length === 0) {
        console.log("⏭️  deliveries: faltan registros relacionados, se omite seeder");
        return 0;
    }
    const insertCount = Math.min(count, orders.length);
    const rows = Array.from({ length: insertCount }, (_, i) => {
        const startDate = faker_1.faker.date.recent();
        return {
            orderId: orders[i].id,
            deliveryDriverId: faker_1.faker.helpers.arrayElement(deliveryDrivers).id,
            startDate,
            endDate: new Date(startDate.getTime() + 30 * 60 * 1000),
            total: faker_1.faker.number.int({ min: 3000, max: 10000 }),
            observations: faker_1.faker.lorem.sentence(),
            status: "active",
        };
    });
    await delivery_model_1.Delivery.bulkCreate(rows);
    console.log(`✅ deliveries: insertados ${rows.length} registro(s) falsos`);
    return rows.length;
}
//# sourceMappingURL=deliveries.seeder.js.map