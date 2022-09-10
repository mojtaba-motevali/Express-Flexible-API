import { Location } from "express-validator";

export interface ICommonValidation<T> {
  locations: Location[];
  optionalFields: (keyof T | "*")[];
}
