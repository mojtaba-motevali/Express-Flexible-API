import { Location } from "express-validator";

export interface IEnvSchema {
  SERVICE_PORT: number;
  DB_URL: string;
  ALLOWED_ORIGINS: string[];
}

export interface ICommonValidation<T> {
  locations: Location[];
  optionalFields: (keyof T | "*")[];
}
