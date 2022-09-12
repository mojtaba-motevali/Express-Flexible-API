import express from "express";
import { querySchema } from "utils/common";
import { validate } from "utils/validator";
import { createProfileController, findProfilesController } from "./controller";
import { validateFindProfile, validateProfileCreation } from "./validators";

const profileRouter = express.Router();

profileRouter.get(
  "/",
  validate([...querySchema, ...validateFindProfile]),
  findProfilesController
);

profileRouter.post(
  "/",
  validate(validateProfileCreation),
  createProfileController
);

export default profileRouter;
