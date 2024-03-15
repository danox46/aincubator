import express from "express";
import databaseRoutes from "./database/router";
import authRoutes from "./auth/router";

const router = express.Router();

router.use("/database", databaseRoutes);
router.use("/auth", authRoutes);

export default router;
