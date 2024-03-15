"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountSchema = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.accountSchema = {
    name: process.env.SERVICE || "account",
    mealPlanIds: { type: "Array<string>" },
    recipeIds: { type: "Array<string>" },
    userInfo: {
        type: "Object",
        properties: [
            { fullName: "string" },
            { age: "Amount" },
            { weight: "Amount" },
            { height: "Amount" },
        ],
    },
    goalIds: { type: "Array<string>" },
    groceryList: { type: "Array<string>" },
};
//# sourceMappingURL=model.js.map