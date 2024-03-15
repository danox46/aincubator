"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./ingredients/router"));
const router_2 = __importDefault(require("./recipes/router"));
const router = express_1.default.Router();
router.use("/ingredient", router_1.default);
router.use("/recipe", router_2.default);
exports.default = router;
//# sourceMappingURL=index.js.map