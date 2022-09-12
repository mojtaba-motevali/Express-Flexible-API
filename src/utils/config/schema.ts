import { IEnvSchema } from "interfaces";
import Joi from "joi";
import { numberSchema, stringSchema } from "utils/validator";

export const EnvValidator = Joi.object<IEnvSchema>({
  SERVICE_PORT: numberSchema,
  DB_URL: stringSchema.required().pattern(/^mongodb:\/\/.+:[0-9]+/),
  ALLOWED_ORIGINS: Joi.array()
    .required()
    .items(stringSchema.regex(/https?:\/\//)),
  NODE_ENV: stringSchema.valid("dev", "prod"),
});
