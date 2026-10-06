"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersRepository = void 0;
const customer_model_1 = require("./customer.model");
/**
 * Capa Repository del feature Customers.
 *
 * Única responsable de hablar con Sequelize (el modelo `Customer`).
 * No contiene reglas de negocio ni conoce `req`/`res`.
 */
class CustomersRepository {
    /** Todos los registros activos. */
    async findAllActive() {
        return customer_model_1.Customer.findAll({ where: { status: "active" } });
    }
    /** Un registro por PK (o `null`). Acepta transacción para flujos de ventas. */
    async findById(id, transaction) {
        return customer_model_1.Customer.findByPk(id, { transaction });
    }
    /** Inserta un registro. */
    async create(data) {
        return customer_model_1.Customer.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(customer, data) {
        return customer.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(customer) {
        await customer.destroy();
    }
}
exports.CustomersRepository = CustomersRepository;
//# sourceMappingURL=customers.repository.js.map