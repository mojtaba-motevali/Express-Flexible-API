import express from "express";
import { querySchema } from "utils/common";
import { validate } from "utils/validator";
import { createProfileController, findProfilesController } from "./controller";
import { validateProfile } from "./validators";

const profileRouter = express.Router();

profileRouter.get(
  "/",
  validate([
    ...querySchema,
    ...validateProfile({ locations: ["query"], optionalFields: ["*"] }),
  ]),
  findProfilesController
);

profileRouter.post(
  "/",
  validate(
    validateProfile({
      locations: ["body"],
      optionalFields: ["nickname", "prefered_cryptocurrency"],
    })
  ),
  createProfileController
);

export default profileRouter;
