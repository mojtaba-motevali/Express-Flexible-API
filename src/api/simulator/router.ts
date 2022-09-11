import express from "express";
import { querySchema } from "utils/common";
import { validate } from "utils/validator";
import {
  createSimulatorController,
  findSimulatorController,
} from "./controller";
import {
  validateFindSimulators,
  validateSimulatorCreation,
} from "./validators";

const simulatorRouter = express.Router();

simulatorRouter.get(
  "/",
  validate([...querySchema, ...validateFindSimulators]),
  findSimulatorController
);

simulatorRouter.post(
  "/",
  validate(validateSimulatorCreation),
  createSimulatorController
);

export default simulatorRouter;
