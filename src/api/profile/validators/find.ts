import { checkSchema } from "express-validator";
import { Types } from "mongoose";
import {
  customQueryRegexSanizer,
  customQuerySanizier,
  customQueryValidator,
} from "utils/common";
import {
  dateSchema,
  emailSchema,
  numberSchema,
  objectIdSchema,
  stringSchema,
} from "utils/validator";

export interface TProfile {
  _id?: Types.ObjectId;
  first_name: string;
  last_name: string;
  nickname?: string;
  capital: number;
  email: string;
  divisa?: string;
  prefered_cryptocurrency?: string;
}

export const validateFindProfile = checkSchema(
  {
    _id: {
      customSanitizer: {
        options: (value) =>
          customQuerySanizier<Types.ObjectId>(value, Types.ObjectId as any),
      },
      custom: {
        options: (value) => customQueryValidator(value, objectIdSchema),
      },
      optional: true,
    },
    full_name: {
      customSanitizer: {
        options: (value) => customQueryRegexSanizer(value),
      },
      custom: {
        options: (value) => customQueryValidator(value, stringSchema),
      },
      optional: true,
    },
    capital: {
      customSanitizer: {
        options: (value) => customQuerySanizier(value, Number),
      },
      custom: {
        options: (value) => customQueryValidator(value, numberSchema),
      },
      optional: true,
    },
    email: {
      customSanitizer: {
        options: (value) => customQuerySanizier(value, String),
      },
      custom: {
        options: (value) => customQueryValidator(value, emailSchema),
      },
      optional: true,
    },
    divisa: {
      customSanitizer: {
        options: (value) => customQuerySanizier(value, Number),
      },
      custom: {
        options: (value) => customQueryValidator(value, numberSchema),
      },
      optional: true,
    },
    prefered_cryptocurrency: {
      customSanitizer: {
        options: (value) => customQuerySanizier(value, String),
      },
      custom: {
        options: (value) => customQueryValidator(value, stringSchema),
      },
      optional: true,
    },
    created_at: {
      customSanitizer: {
        options: (value) => customQuerySanizier(value, (v) => new Date(v)),
      },
      custom: {
        options: (value) => customQueryValidator(value, dateSchema),
      },
      optional: true,
    },
  },
  ["query"]
);
