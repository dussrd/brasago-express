"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProducts = seedProducts;
const faker_1 = require("@faker-js/faker");
const product_model_1 = require("./product.model");
/**
 * Seeder del feature Products (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
async function seedProducts(count) {
    if (count <= 0) {
        console.log("⏭️  products: count=0, se omite");
        return 0;
    }
    const existing = await product_model_1.Product.count();
    if (existing > 0) {
        console.log(`⏭️  products: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const rows = Array.from({ length: count }, (_, i) => ({
        sku: `PROD-${i}-${faker_1.faker.string.alphanumeric(6)}`,
        name: faker_1.faker.commerce.productName(),
        description: faker_1.faker.commerce.productDescription(),
        price: faker_1.faker.number.int({ min: 5000, max: 50000 }),
        status: "active",
    }));
    await product_model_1.Product.bulkCreate(rows);
    console.log(`✅ products: insertados ${rows.length} registro(s) falsos`);
    return rows.length;
}
//# sourceMappingURL=products.seeder.js.map