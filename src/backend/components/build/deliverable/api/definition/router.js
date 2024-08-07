"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
const controller = controller_1.GptController.getInstance();
router.post("/chat", controller.chat);
router.post("/event", controller.listen);
exports.default = router;
//# sourceMappingURL=router.js.map