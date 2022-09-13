import dotenv from "dotenv";
import { EnvValidator } from "./schema";

dotenv.config();

const { error, value: env } = EnvValidator.validate({
  SERVICE_PORT: Number(process.env.SERVICE_PORT),
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(","),
  NODE_ENV: process.env.NODE_ENV,
  DB_SCHEMA: process.env.DB_SCHEMA,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
});

if (error) {
  throw new Error(error.message);
}
export const SERVICE_PORT = env.SERVICE_PORT;
export const DB_URL = `mongodb://${
  process.env.DB_USER && process.env.DB_PASS
    ? process.env.DB_USER + ":" + process.env.DB_PASS + "@"
    : ""
}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SCHEMA}`;
export const ALLOWED_ORIGINS = env.ALLOWED_ORIGINS;
export const NODE_ENV = env.NODE_ENV;
