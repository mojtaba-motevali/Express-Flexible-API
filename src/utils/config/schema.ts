import Joi from "joi";
import { IEnvSchema } from "../../interfaces";
import { numberSchema, stringSchema } from "../validator";

export const EnvValidator = Joi.object<IEnvSchema>({
  SERVICE_PORT: numberSchema,
  DB_USER: stringSchema,
  DB_PASS: stringSchema,
  DB_HOST: stringSchema.required(),
  DB_PORT: numberSchema.required(),
  DB_SCHEMA: stringSchema.required(),
  ALLOWED_ORIGINS: Joi.array()
    .required()
    .items(stringSchema.regex(/https?:\/\//)),
  NODE_ENV: stringSchema.valid("dev", "prod"),
});
