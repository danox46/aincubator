"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const zod_1 = require("zod");
exports.List = zod_1.z.array(zod_1.z.object({
    _id: zod_1.z.string().min(1),
    name: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional(),
}));
//# sourceMappingURL=AppList.js.map