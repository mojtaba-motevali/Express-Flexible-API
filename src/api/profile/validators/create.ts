import { checkSchema } from "express-validator";

export const validateProfileCreation = checkSchema(
  {
    "profiles.*.first_name": {
      isString: true,
      trim: true,
      isLength: {
        options: { min: 3, max: 50 },
        errorMessage: `first_name length should be between 3 and 50 characters.`,
      },
    },
    "profiles.*.last_name": {
      isString: true,
      trim: true,
      isLength: {
        options: { min: 3, max: 50 },
        errorMessage: `last_name length should be between 3 and 50 characters.`,
      },
    },
    "profiles.*.nickname": {
      isString: true,
      trim: true,
      isLength: {
        options: { min: 3, max: 50 },
        errorMessage: `nickname length should be between 3 and 50 characters.`,
      },
      optional: true,
    },
    "profiles.*.email": {
      trim: true,
      isEmail: {
        errorMessage: "Invalid Email format provided.",
      },
    },
    "profiles.*.capital": {
      toInt: true,
      isInt: true,
      errorMessage: "capital should number.",
    },
    "profiles.*.divisa": {
      isString: true,
      trim: true,
      optional: true,
    },
    "profiles.*.prefered_cryptocurrency": {
      isString: true,
      trim: true,
      optional: true,
    },
  },
  ["body"]
);
