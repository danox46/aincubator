import express from "express";
import { AccountController } from "./controller";

const router = express.Router();

const controller = AccountController.getInstance();

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

export default router;
