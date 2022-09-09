import express from "express";
import profileRouter from "./profile/router";

const router = express.Router();

router.use("/profile", profileRouter);

export default router;
