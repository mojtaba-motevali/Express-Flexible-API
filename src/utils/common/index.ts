import { Response } from "express";
import { checkSchema, Location } from "express-validator";
import { Optional } from "express-validator/src/context";
import { InterceptorJsonBody } from "interceptors";
import { ICommonValidation } from "interfaces";
import Joi, { Schema } from "joi";

export const overrideExpressJson = (response: Response) => {
  const json = response.json;
  response.json = function (body) {
    const newBody = InterceptorJsonBody({
      statusCode: this.statusCode,
      body,
    });
    return json.call(this, newBody);
  };
};

export const commonSchemaValidation = <T>({
  optionalFields,
  locations,
  field,
}: ICommonValidation<T> & { field: keyof T }): {
  in: Location[];
  optional: true | { options?: Partial<Optional> | undefined } | undefined;
} => {
  const allOptional = optionalFields[0] === "*";
  const allRequired = optionalFields.length < 1;
  return {
    in: locations,
    optional: allRequired
      ? undefined
      : allOptional ||
        (optionalFields.length > 0 && optionalFields.includes(field))
      ? true
      : undefined,
  };
};

export const querySchema = checkSchema({
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
});

export const customQuerySanizier = <T>(
  value: string,
  cast: (value: string) => T
) => {
  if (typeof value === "string") {
    const isComparison = value.includes("|");
    if (isComparison) {
      const splited = value.split("|");
      const result: { $gte?: T; $lte?: T } = {};
      if (splited[0]) {
        result.$gte = cast(splited[0]);
      }
      if (splited[1]) {
        result.$lte = cast(splited[1]);
      }
      return result;
    } else if (value.includes(",")) {
      return {
        $in: value.split(",").map((item) => cast(item)),
      };
    } else {
      return cast(value);
    }
  }
};
/**
 * This function retrieves value of T and a schema of Joi with specified type validation
 * and does validation.
 * @param value {T}
 * @param schema {Schema}
 */
export const customQueryValidator = <T extends { $in: T }>(
  value: T,
  schema: Schema
) => {
  let schemaToBeValidated: Schema | null = null;
  if (typeof value == "object") {
    if (value.$in && Array.isArray(value.$in)) {
      schemaToBeValidated = Joi.object({
        $in: Joi.array().items(schema),
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
