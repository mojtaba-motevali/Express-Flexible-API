import { checkSchema } from "express-validator";
import { Types } from "mongoose";
import {
  customQueryRegexSanizer,
  customQuerySanizier,
  customQueryValidator,
} from "utils/common";
import { dateSchema, objectIdSchema, stringSchema } from "utils/validator";

export const validateFindFavorites = checkSchema(
  {
    profile_id: {
      customSanitizer: {
        options: (value) =>
          customQuerySanizier<Types.ObjectId>(value, Types.ObjectId as any),
      },
      custom: {
        options: (value) => customQueryValidator(value, objectIdSchema),
      },
      optional: true,
    },
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
    profile_included: {
      customSanitizer: {
        options: (value) =>
          value && !Number.isNaN(value) && Number(value) > 0 ? true : false,
      },
      optional: true,
    },
    name: {
      customSanitizer: {
        options: (value) => customQueryRegexSanizer(value),
      },
      custom: {
        options: (value) => customQueryValidator(value, stringSchema),
      },
      optional: true,
    },
    favorites: {
      customSanitizer: {
        options: (value) => {
          const result = customQuerySanizier(value, String);
          return typeof result === "string"
            ? {
                $in: result,
              }
            : result;
        },
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
