"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
const controller = controller_1.HydrationController.getInstance();
router.post("/create", controller.create);
router.post("/create/batch", controller.batchCreate);
router.get("/list", controller.list);
router.post("/read", controller.read);
router.post("/read/batch", controller.batchRead);
router.patch("/update", controller.update);
router.patch("/update/batch", controller.batchUpdate);
router.delete("/delete", controller.delete);
router.delete("/delete/batch", controller.batchDelete);
router.post("/event", controller.listen);
exports.default = router;
//# sourceMappingURL=router.js.map