import { faker } from "@faker-js/faker";
import { Reservation } from "./reservation.model";
import { Customer } from "../../sale/Customers/customer.model";
import { Table } from "../Tables/table.model";

/**
 * Seeder del feature Reservations (datos falsos con @faker-js/faker).
 * Se invoca desde `src/database/seeders` (SeedersRunner), no desde la App.
 *
 * Idempotente: si ya hay filas, no vuelve a insertar.
 */
export async function seedReservations(count: number): Promise<number> {
  if (count <= 0) {
    console.log("⏭️  reservations: count=0, se omite");
    return 0;
  }

  const existing = await Reservation.count();
  if (existing > 0) {
    console.log(`⏭️  reservations: ya hay ${existing} registro(s), se omite seeder`);
    return 0;
  }

  const customers = await Customer.findAll();
  const tables = await Table.findAll();
  if (customers.length === 0 || tables.length === 0) {
    console.log("⏭️  reservations: faltan registros relacionados, se omite seeder");
    return 0;
  }

  const rows = Array.from({ length: count }, (_, i) => {
    const startDate = faker.date.soon();
    return {
    customerId: faker.helpers.arrayElement(customers).id,
    tableId: faker.helpers.arrayElement(tables).id,
    startDate,
    endDate: new Date(startDate.getTime() + 60 * 60 * 1000),
    observations: faker.lorem.sentence(),
    status: "active" as const,
    };
  });

  await Reservation.bulkCreate(rows);
  console.log(`✅ reservations: insertados ${rows.length} registro(s) falsos`);
  return rows.length;
}
