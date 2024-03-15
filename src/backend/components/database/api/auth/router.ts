import express from "express";
import { AuthController } from "./controller";

const router = express.Router();

const controller = AuthController.getInstance();

router.post("/subscribe", controller.subscribe);
router.delete("/unsubscribe", controller.unsubscribe);
router.post("/authenticate", controller.authenticate);
router.get("/get-policy/:accountId", controller.getUserPolicy);
router.put("/set-policy/:accountId", controller.setUserPolicy);
router.post("/event", controller.listen);

export default router;
