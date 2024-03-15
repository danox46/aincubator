"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeInfo = exports.Step = void 0;
const zod_1 = require("zod");
const utils_1 = require("./utils");
const ingredient_1 = require("./ingredient");
const AppObject_1 = require("./AppObject");
exports.Step = zod_1.z.object({
    name: zod_1.z.string().min(1),
    ingredients: zod_1.z.array(AppObject_1.AppId).optional(),
    instruction: zod_1.z.array(zod_1.z.string()).optional(),
    time: zod_1.z.number().optional(),
});
exports.RecipeInfo = zod_1.z.object({
    recipeName: zod_1.z.string().min(3),
    ingredients: zod_1.z
        .array(zod_1.z.object({ amount: utils_1.Ammount, ingredient: AppObject_1.AppId }))
        .optional(),
    steps: zod_1.z.array(exports.Step).optional(),
    calories: utils_1.Ammount.optional(),
    nutrients: zod_1.z.array(ingredient_1.Nutrient).optional(),
    time: zod_1.z.number().optional(),
    image: zod_1.z.string().url().optional(),
    notes: zod_1.z.array(zod_1.z.string()).optional(),
});
//# sourceMappingURL=recipe.js.map