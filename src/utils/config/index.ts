import dotenv from "dotenv";
import { EnvValidator } from "./schema";

dotenv.config();

const { error, value: env } = EnvValidator.validate({
  SERVICE_PORT: Number(process.env.SERVICE_PORT),
});

if (error) {
  throw new Error(error.message);
}
export const SERVICE_PORT = env.SERVICE_PORT;
