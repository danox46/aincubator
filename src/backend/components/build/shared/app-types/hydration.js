"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HydrationInfo = void 0;
const zod_1 = require("zod");
const utils_1 = require("./utils");
exports.HydrationInfo = zod_1.z.object({
    hydrationName: zod_1.z.string().min(3),
    goal: zod_1.z.object({ amount: utils_1.Ammount, metric: zod_1.z.string().min(1) }).optional(),
    schedule: zod_1.z.string().min(1).optional(),
});
//# sourceMappingURL=hydration.js.map