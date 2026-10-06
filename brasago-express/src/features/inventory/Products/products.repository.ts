import { CreationAttributes, Transaction } from "sequelize";
import { Product, ProductI } from "./product.model";

/**
 * Capa Repository del feature Products.
 *
 * Única responsable de hablar con Sequelize (el modelo `Product`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
export class ProductsRepository {
  /** Todos los registros activos. */
  public async findAllActive(): Promise<Product[]> {
    return Product.findAll({ where: { status: "active" } });
  }

  /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
  public async findById(id: number, transaction?: Transaction): Promise<Product | null> {
    return Product.findByPk(id, { transaction });
  }

  /** Inserta un registro. */
  public async create(data: CreationAttributes<Product>): Promise<Product> {
    return Product.create(data);
  }

  /** Persiste cambios sobre una instancia existente. */
  public async update(product: Product, data: Partial<ProductI>): Promise<Product> {
    return product.update(data);
  }

  /** Elimina físicamente una instancia. */
  public async delete(product: Product): Promise<void> {
    await product.destroy();
  }
}
