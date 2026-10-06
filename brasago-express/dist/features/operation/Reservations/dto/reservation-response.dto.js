"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toReservationResponse = toReservationResponse;
/** Mapper modelo -> DTO de respuesta (objeto plano). */
function toReservationResponse(reservation) {
    return reservation.toJSON();
}
//# sourceMappingURL=reservation-response.dto.js.map