import { IEnvSchema } from "interfaces";
import Joi from "joi";

export const EnvValidator = Joi.object<IEnvSchema>({
  SERVICE_PORT: Joi.number(),
  DB_URL: Joi.string()
    .required()
    .pattern(/^mongodb:\/\/.+:[0-9]+/),
  ALLOWED_ORIGINS: Joi.array()
    .required()
    .items(Joi.string().regex(/https?:\/\//)),
});
