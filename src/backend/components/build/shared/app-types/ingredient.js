"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientInfo = exports.Nutrient = void 0;
const zod_1 = require("zod");
const utils_1 = require("./utils");
exports.Nutrient = zod_1.z.object({
    name: zod_1.z.string().min(1),
    value: utils_1.Ammount.optional(),
});
exports.IngredientInfo = zod_1.z.object({
    ingredientName: zod_1.z.string().min(3),
    nutrients: zod_1.z.array(exports.Nutrient).optional(),
    calories: utils_1.Ammount.optional(),
    image: zod_1.z.string().url().optional(),
    notes: zod_1.z.array(zod_1.z.string().min(1)).optional(),
});
//# sourceMappingURL=ingredient.js.map