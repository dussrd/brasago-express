import { faker } from "@faker-js/faker";
import { Product } from "./product.model";

/**
 * Seeder del feature Products (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
export async function seedProducts(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  products: count=0, se omite");
    return 0;
  }

  const existing = await Product.count();
  if (existing > 0) {
    console.log(`⏭️  products: ya hay ${existing} registro(s), se omite seeder`);
    return 0;
  }

  const rows = Array.from({ length: count }, (_, i) => ({
    sku: `PROD-${i}-${faker.string.alphanumeric(6)}`,
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.number.int({ min: 5000, max: 50000 }),
    status: "active" as const,
  }));

  await Product.bulkCreate(rows);
  console.log(`✅ products: insertados ${rows.length} registro(s) falsos`);
  return rows.length;
}
