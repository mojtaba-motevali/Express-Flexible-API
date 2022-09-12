import express from "express";
import { queryValidatorSchema } from "utils/common";
import { validate } from "utils/validator";
import {
  createSimulatorController,
  findSimulatorController,
} from "./controller";
import { Simulator } from "./model";
import {
  validateFindSimulators,
  validateSimulatorCreation,
} from "./validators";

const simulatorRouter = express.Router();

simulatorRouter.get(
  "/",
  validate([
    ...queryValidatorSchema(Object.keys(Simulator.schema.obj)),
    ...validateFindSimulators,
  ]),
  findSimulatorController
);

simulatorRouter.post(
  "/",
  validate(validateSimulatorCreation),
  createSimulatorController
);

export default simulatorRouter;
