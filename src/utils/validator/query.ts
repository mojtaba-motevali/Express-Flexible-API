import { checkSchema } from "express-validator";
import Joi, { Schema } from "joi";
import { customQuerySortSanizier } from "../common/sanitizer";
import { enumSchema } from "./schema";

export const queryValidatorSchema = (sortWhitelist: string[]) =>
  checkSchema({
    limit: {
      isInt: true,
      toInt: true,
      errorMessage: "limit should be an integer",
      isLength: {
        options: { min: 0, max: 100 },
        errorMessage: "limit should be between 0 and 100.",
      },
      in: ["query"],
    },
    page: {
      isInt: true,
      toInt: true,
      isLength: {
        options: { min: 1 },
        errorMessage: "page should be more 1.",
      },
      errorMessage: "page should be an integer",
      in: ["query"],
    },
    sort: {
      customSanitizer: {
        options: (value) => customQuerySortSanizier(value),
      },
      custom: {
        options: (fields) => {
          const { error, value } = enumSchema(
            Array.from(sortWhitelist)
          ).validate(Array.from(Object.keys(fields)));
          if (error) {
            throw new Error(error.message);
          } else {
            return value;
          }
        },
      },
      optional: true,
      in: ["query"],
    },
  });

/**
 * This function retrieves value of T and a schema of Joi with specified type validation
 * and does validation.
 * @param value {T}
 * @param schema {Schema}
 */
export const customQueryValidator = <T extends { $in: T } & { $regex: T }>(
  value: T,
  schema: Schema
) => {
  let schemaToBeValidated: Schema | null = null;
  if (typeof value == "object") {
    if (value.$in && Array.isArray(value.$in)) {
      schemaToBeValidated = Joi.object({
        $in: Joi.array().items(schema),
      });
    } else if (value.$regex) {
      schemaToBeValidated = Joi.object({
        $regex: Joi.custom((val) => val instanceof RegExp),
      });
    } else {
      schemaToBeValidated = Joi.object({
        $gte: schema.optional(),
        $lte: schema.optional(),
      });
    }
  } else {
    schemaToBeValidated = schema;
  }
  const { error } = schemaToBeValidated.validate(value);
  if (error) {
    throw new Error(error.message);
  }
  return value;
};
