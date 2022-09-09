import dotenv from "dotenv";
import { EnvValidator } from "./schema";

dotenv.config();

const { error, value: env } = EnvValidator.validate({
  SERVICE_PORT: Number(process.env.SERVICE_PORT),
  DB_URL: process.env.DB_URL,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(","),
});

if (error) {
  throw new Error(error.message);
}
export const SERVICE_PORT = env.SERVICE_PORT;
export const DB_URL = env.DB_URL;
export const ALLOWED_ORIGINS = env.ALLOWED_ORIGINS;
