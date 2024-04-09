import express from "express";
import { GptController } from "./controller";

const router = express.Router();

const controller = GptController.getInstance();

router.post("/event", controller.listen);

export default router;
