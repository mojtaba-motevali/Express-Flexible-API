import { Response } from "express";
import { checkSchema, Location } from "express-validator";
import { Optional } from "express-validator/src/context";
import { InterceptorJsonBody } from "interceptors";
import { ICommonValidation } from "interfaces";

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
  const allRequired = optionalFields === undefined || optionalFields === null;
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
      options: { min: 1, max: 100 },
      errorMessage: "limit should be between 1 and 100.",
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
