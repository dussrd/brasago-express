"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCustomerResponse = toCustomerResponse;
/** Mapper modelo -> DTO de respuesta (objeto plano). */
function toCustomerResponse(customer) {
    return customer.toJSON();
}
//# sourceMappingURL=customer-response.dto.js.map