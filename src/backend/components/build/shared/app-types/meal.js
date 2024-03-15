"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealInfo = void 0;
const zod_1 = require("zod");
const utils_1 = require("./utils");
const AppObject_1 = require("./AppObject");
const ingredient_1 = require("./ingredient");
exports.MealInfo = zod_1.z.object({
    mealName: zod_1.z.string().min(3),
    recipes: zod_1.z
        .array(zod_1.z.object({ recipeId: AppObject_1.AppId, schedule: zod_1.z.string().min(1) }))
        .optional(),
    dailyCaloryAvg: utils_1.Ammount.optional(),
    dailyMacrosAvg: zod_1.z.array(ingredient_1.Nutrient).optional(),
});
//# sourceMappingURL=meal.js.map