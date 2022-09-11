import { checkSchema } from "express-validator";
import Joi from "joi";
import { isValidObjectId, Types } from "mongoose";
import { customQuerySanizier, customQueryValidator } from "utils/common";
const joiDate = Joi.date();
const joiNumber = Joi.number();
const joiObjectId = Joi.custom((value) => {
  return isValidObjectId(value);
});
export const validateFindSimulators = checkSchema(
  {
    profile_id: {
      customSanitizer: {
        options: (value) =>
          customQuerySanizier<Types.ObjectId>(value, Types.ObjectId as any),
      },
      custom: {
        options: (value) => customQueryValidator(value, joiObjectId),
      },
      optional: true,
    },
    profile_included: {
      customSanitizer: {
        options: (value) =>
          value && !Number.isNaN(value) && Number(value) > 0 ? true : false,
      },
      optional: true,
    },
    cryptocurrency: {
      isString: true,
      trim: true,
      isLength: {
        options: { min: 3, max: 10 },
        errorMessage: `cryptocurrency length should be between 3 and 10 characters.`,
      },
      optional: true,
    },
    date_recorded: {
      customSanitizer: {
        options: (value) => customQuerySanizier(value, (v) => new Date(v)),
      },
      custom: {
        options: (value) => customQueryValidator(value, joiDate),
      },
      optional: true,
    },
    euros: {
      customSanitizer: {
        options: (value) => customQuerySanizier(value, Number),
      },
      custom: {
        options: (value) => customQueryValidator(value, joiNumber),
      },
      optional: true,
    },
    price: {
      customSanitizer: {
        options: (value) => customQuerySanizier(value, Number),
      },
      custom: {
        options: (value) => customQueryValidator(value, joiNumber),
      },
      optional: true,
    },
    quantity: {
      customSanitizer: {
        options: (value) => customQuerySanizier(value, Number),
      },
      custom: {
        options: (value) => customQueryValidator(value, joiNumber),
      },
      optional: true,
    },
  },
  ["query"]
);
