"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalInfo = exports.Reminder = void 0;
const zod_1 = require("zod");
const utils_1 = require("./utils");
exports.Reminder = zod_1.z.object({
    schedule: zod_1.z.string().min(1),
    message: zod_1.z.string().optional(),
});
const goal = zod_1.z.object({ amount: utils_1.Ammount, metric: zod_1.z.string().min(1) });
exports.GoalInfo = zod_1.z.object({
    goalName: zod_1.z.string().min(3),
    start: goal.optional(),
    goal: goal.optional(),
    mesurements: zod_1.z.array(goal).optional(),
});
//# sourceMappingURL=goal.js.map