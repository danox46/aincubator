"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountInfo = void 0;
const zod_1 = require("zod");
const utils_1 = require("./utils");
const AppList_1 = require("./AppList");
exports.AccountInfo = zod_1.z.object({
    accountName: zod_1.z.string().min(3),
    userInfo: zod_1.z
        .object({
        height: utils_1.Ammount.optional(),
        weight: utils_1.Ammount.optional(),
    })
        .optional(),
    mealPlans: AppList_1.List.optional(),
    recipes: AppList_1.List.optional(),
    goals: AppList_1.List.optional(),
    groceryList: AppList_1.List.optional(),
});
//# sourceMappingURL=account.js.map