"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedOrderDetails = seedOrderDetails;
const faker_1 = require("@faker-js/faker");
const order_detail_model_1 = require("./order-detail.model");
const order_model_1 = require("../Orders/order.model");
const product_model_1 = require("../../inventory/Products/product.model");
/**
 * Seeder del feature OrderDetails (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
async function seedOrderDetails(count) {
    if (count <= 0) {
        console.log("⏭️  order-details: count=0, se omite");
        return 0;
    }
    const existing = await order_detail_model_1.OrderDetail.count();
    if (existing > 0) {
        console.log(`⏭️  order-details: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const orders = await order_model_1.Order.findAll();
    const products = await product_model_1.Product.findAll();
    if (orders.length === 0 || products.length === 0) {
        console.log("⏭️  order-details: faltan registros relacionados, se omite seeder");
        return 0;
    }
    const rows = Array.from({ length: count }, (_, i) => {
        const product = faker_1.faker.helpers.arrayElement(products);
        const quantity = faker_1.faker.number.int({ min: 1, max: 5 });
        const unitValue = Number(product.price);
        return {
            orderId: faker_1.faker.helpers.arrayElement(orders).id,
            productId: product.id,
            quantity,
            unitValue,
            total: quantity * unitValue,
            observations: faker_1.faker.lorem.sentence(),
            status: "active",
        };
    });
    await order_detail_model_1.OrderDetail.bulkCreate(rows);
    console.log(`✅ order-details: insertados ${rows.length} registro(s) falsos`);
    return rows.length;
}
//# sourceMappingURL=order-details.seeder.js.map