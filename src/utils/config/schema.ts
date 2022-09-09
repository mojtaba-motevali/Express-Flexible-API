import Joi from "joi";
import { IEnvSchema } from "types";

export const EnvValidator = Joi.object<IEnvSchema>({
  SERVICE_PORT: Joi.number(),
});
