import express from "express";
import favoriteRouter from "./favorite/router";
import profileRouter from "./profile/router";
import simulatorRouter from "./simulator/router";

const router = express.Router();

router.use("/profiles", profileRouter);
router.use("/simulators", simulatorRouter);
router.use("/favorites", favoriteRouter);

export default router;
