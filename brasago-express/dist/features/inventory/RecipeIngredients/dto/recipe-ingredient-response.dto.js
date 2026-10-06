"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRecipeIngredientResponse = toRecipeIngredientResponse;
/** Mapper modelo -> DTO de respuesta (objeto plano). */
function toRecipeIngredientResponse(recipeIngredient) {
    return recipeIngredient.toJSON();
}
//# sourceMappingURL=recipe-ingredient-response.dto.js.map