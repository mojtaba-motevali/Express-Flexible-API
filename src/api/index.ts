import express from "express";
import profileRouter from "./profile/router";
import simulatorRouter from "./simulator/router";

const router = express.Router();

router.use("/profile", profileRouter);
router.use("/simulator", simulatorRouter);
export default router;
