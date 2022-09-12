import express from "express";
import { queryValidatorSchema } from "utils/common";
import { validate } from "utils/validator";
import {
  createSimulatorController,
  findSimulatorController,
} from "./controller";
import { Favorite } from "./model";
import { validateFavoriteCreation, validateFindFavorites } from "./validators";

const simulatorRouter = express.Router();

simulatorRouter.get(
  "/",
  validate([
    ...queryValidatorSchema([
      ...Object.keys(Favorite.schema.obj),
      "created_at",
    ]),
    ...validateFindFavorites,
  ]),
  findSimulatorController
);

simulatorRouter.post(
  "/",
  validate(validateFavoriteCreation),
  createSimulatorController
);

export default simulatorRouter;
