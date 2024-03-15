import express from "express";
import accountRouter from "./accounts/router";

const router = express.Router();

router.use("/account", accountRouter);

export default router;
