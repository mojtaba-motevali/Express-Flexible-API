import express from "express";
import { queryValidatorSchema } from "utils/common";
import { validate } from "utils/validator";
import { createProfileController, findProfilesController } from "./controller";
import { Profile } from "./model";
import { validateFindProfile, validateProfileCreation } from "./validators";

const profileRouter = express.Router();

profileRouter.get(
  "/",
  validate([
    ...queryValidatorSchema(Object.keys(Profile.schema.obj)),
    ...validateFindProfile,
  ]),
  findProfilesController
);

profileRouter.post(
  "/",
  validate(validateProfileCreation),
  createProfileController
);

export default profileRouter;
