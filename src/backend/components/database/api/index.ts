import express from "express";
import databaseRoutes from "./database/router";

const router = express.Router();

router.use("/database", databaseRoutes);

export default router;
