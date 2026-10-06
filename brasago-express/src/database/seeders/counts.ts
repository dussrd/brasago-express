/** Cantidades por entidad. Prioridad: CLI > entorno > valores por defecto. */
export type SeedCounts = {
  branches: number;
  customers: number;
  products: number;
  ingredients: number;
  deliveryDrivers: number;
  tables: number;
  recipeIngredients: number;
  orders: number;
  orderDetails: number;
  reservations: number;
  deliveries: number;
  payments: number;
};

export const DEFAULT_SEED_COUNTS: SeedCounts = {
  branches: 10,
  customers: 10,
  products: 10,
  ingredients: 10,
  deliveryDrivers: 10,
  tables: 10,
  recipeIngredients: 10,
  orders: 10,
  orderDetails: 10,
  reservations: 10,
  deliveries: 10,
  payments: 10,
};

const SEED_OPTIONS: Record<keyof SeedCounts, { flag: string; environment: string }> = {
  branches: { flag: "branches", environment: "SEED_BRANCHES" },
  customers: { flag: "customers", environment: "SEED_CUSTOMERS" },
  products: { flag: "products", environment: "SEED_PRODUCTS" },
  ingredients: { flag: "ingredients", environment: "SEED_INGREDIENTS" },
  deliveryDrivers: { flag: "delivery-drivers", environment: "SEED_DELIVERY_DRIVERS" },
  tables: { flag: "tables", environment: "SEED_TABLES" },
  recipeIngredients: { flag: "recipe-ingredients", environment: "SEED_RECIPE_INGREDIENTS" },
  orders: { flag: "orders", environment: "SEED_ORDERS" },
  orderDetails: { flag: "order-details", environment: "SEED_ORDER_DETAILS" },
  reservations: { flag: "reservations", environment: "SEED_RESERVATIONS" },
  deliveries: { flag: "deliveries", environment: "SEED_DELIVERIES" },
  payments: { flag: "payments", environment: "SEED_PAYMENTS" },
};

/** Acepta enteros no negativos; 0 omite el seeder de esa entidad. */
function parseCount(raw: string, feature: string): number {
  if (!/^\d+$/.test(raw) || !Number.isSafeInteger(Number(raw))) {
    throw new Error(`Cantidad inválida para ${feature}: ${raw}`);
  }
  return Number(raw);
}

/** Ejemplos: --customers=20, --delivery-drivers=5, SEED_ORDER_DETAILS=30. */
export function resolveSeedCounts(argv: string[] = process.argv.slice(2)): SeedCounts {
  const counts: SeedCounts = { ...DEFAULT_SEED_COUNTS };

  for (const key of Object.keys(SEED_OPTIONS) as (keyof SeedCounts)[]) {
    const { flag, environment } = SEED_OPTIONS[key];
    const prefix = `--${flag}=`;
    const argument = argv.filter((value) => value.startsWith(prefix)).pop();
    const raw = argument !== undefined
      ? argument.slice(prefix.length)
      : process.env[environment];

    if (raw !== undefined) {
      counts[key] = parseCount(raw, flag);
    }
  }

  return counts;
}
