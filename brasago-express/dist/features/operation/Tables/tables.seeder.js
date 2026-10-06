"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedTables = seedTables;
const faker_1 = require("@faker-js/faker");
const table_model_1 = require("./table.model");
const branch_model_1 = require("../Branches/branch.model");
/**
 * Seeder del feature Tables (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
async function seedTables(count) {
    if (count <= 0) {
        console.log("⏭️  tables: count=0, se omite");
        return 0;
    }
    const existing = await table_model_1.Table.count();
    if (existing > 0) {
        console.log(`⏭️  tables: ya hay ${existing} registro(s), se omite seeder`);
        return 0;
    }
    const branches = await branch_model_1.Branch.findAll();
    if (branches.length === 0) {
        console.log("⏭️  tables: faltan registros relacionados, se omite seeder");
        return 0;
    }
    const rows = Array.from({ length: count }, (_, i) => ({
        branchId: faker_1.faker.helpers.arrayElement(branches).id,
        name: `Mesa ${i + 1}`,
        description: faker_1.faker.lorem.sentence(),
        status: "active",
    }));
    await table_model_1.Table.bulkCreate(rows);
    console.log(`✅ tables: insertados ${rows.length} registro(s) falsos`);
    return rows.length;
}
//# sourceMappingURL=tables.seeder.js.map