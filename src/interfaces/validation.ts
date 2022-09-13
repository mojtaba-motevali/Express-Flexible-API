import { Location } from "express-validator";

export interface IEnvSchema {
  SERVICE_PORT: number;
  ALLOWED_ORIGINS: string[];
  DB_SCHEMA: string;
  DB_USER?: string;
  DB_PASS?: string;
  DB_HOST: string;
  DB_PORT: number;
  NODE_ENV: "dev" | "prod";
}

export interface ICommonValidation<T> {
  locations: Location[];
  optionalFields: (keyof T | "*")[];
}
