import express from "express";
import { DatabaseController } from "./controller";

const router = express.Router();

const controller = DatabaseController.getInstance();

router.post("/create", controller.create);
router.post("/create/batch", controller.batchCreate);
router.get("/list/:name", controller.list);
router.post("/read/:name", controller.read);
router.post("/read/batch/:name", controller.batchRead);
router.patch("/update", controller.update);
router.patch("/update/batch", controller.batchUpdate);
router.delete("/delete/:name", controller.delete);
router.delete("/delete/batch/:name", controller.batchDelete);
router.post("/search/:name", controller.search);
router.put("/upsert", controller.upsert);

export default router;
