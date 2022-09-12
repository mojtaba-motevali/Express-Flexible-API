import express from "express";
import { queryValidatorSchema } from "utils/common";
import { validate } from "utils/validator";
import {
  createSimulatorController,
  findSimulatorController,
} from "./controller";
import { Favorite } from "./model";
import { validateFavoriteCreation, validateFindFavorites } from "./validators";

const favoriteRouter = express.Router();

favoriteRouter.get(
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

favoriteRouter.post(
  "/",
  validate(validateFavoriteCreation),
  createSimulatorController
);

export default favoriteRouter;
