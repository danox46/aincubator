"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
const controller = controller_1.AuthController.getInstance();
router.post("/subscribe", controller.subscribe);
router.delete("/unsubscribe", controller.unsubscribe);
router.post("/authenticate", controller.authenticate);
router.get("/get-policy/:accountId", controller.getUserPolicy);
router.put("/set-policy/:accountId", controller.setUserPolicy);
router.post("/event", controller.listen);
exports.default = router;
//# sourceMappingURL=router.js.map