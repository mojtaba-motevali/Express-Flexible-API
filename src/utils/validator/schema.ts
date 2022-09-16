import Joi from "joi";
import { isValidObjectId } from "mongoose";

export const enumSchema = (whiteList: string[]) =>
  Joi.array().items(Joi.valid(...whiteList));
export const stringSchema = Joi.string();
export const emailSchema = stringSchema.email();
export const dateSchema = Joi.date();
export const numberSchema = Joi.number();
export const objectIdSchema = Joi.custom((value) => {
  return isValidObjectId(value);
});
