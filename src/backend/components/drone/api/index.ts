import express from "express";
import accountRouter from "./gpt/router";

const router = express.Router();

router.use("/gpt", accountRouter);

export default router;
