"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRepository = void 0;
const product_model_1 = require("./product.model");
/**
 * Capa Repository del feature Products.
 *
 * Única responsable de hablar con Sequelize (el modelo `Product`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
class ProductsRepository {
    /** Todos los registros activos. */
    async findAllActive() {
        return product_model_1.Product.findAll({ where: { status: "active" } });
    }
    /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
    async findById(id, transaction) {
        return product_model_1.Product.findByPk(id, { transaction });
    }
    /** Inserta un registro. */
    async create(data) {
        return product_model_1.Product.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(product, data) {
        return product.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(product) {
        await product.destroy();
    }
}
exports.ProductsRepository = ProductsRepository;
//# sourceMappingURL=products.repository.js.map