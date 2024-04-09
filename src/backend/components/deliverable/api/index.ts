import express from "express";
import accountRouter from "./definition/router";

const router = express.Router();

router.use("/gpt", accountRouter);

export default router;
