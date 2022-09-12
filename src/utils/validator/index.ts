import { NextFunction, Request, Response } from "express";
import { validationResult, ValidationChain } from "express-validator";
import Joi from "joi";
import { isValidObjectId } from "mongoose";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json(errors.array());
  };
};
export const enumSchema = (whiteList: string[]) =>
  Joi.array().items(Joi.allow(whiteList));
export const stringSchema = Joi.string();
export const emailSchema = stringSchema.email();
export const dateSchema = Joi.date();
export const numberSchema = Joi.number();
export const objectIdSchema = Joi.custom((value) => {
  return isValidObjectId(value);
});
