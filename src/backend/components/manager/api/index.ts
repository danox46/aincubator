import express from "express";
import instructionRouter from "./instruction/router";

const router = express.Router();

router.use("/instruction", instructionRouter);

export default router;
