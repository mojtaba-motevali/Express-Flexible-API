import express from "express";
import { validate } from "utils/validator";
import { createProfile } from "./controller";
import { validateCreateProfile } from "./validators";

const profileRouter = express.Router();

profileRouter.get("/");

profileRouter.post("/", validate(validateCreateProfile), createProfile);

export default profileRouter;
