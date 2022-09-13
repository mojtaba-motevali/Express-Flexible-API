import { checkSchema } from "express-validator";
import { Types } from "mongoose";
import { customQuerySanitizer, customQueryValidator } from "utils/common";
import { dateSchema, objectIdSchema, stringSchema } from "utils/validator";

export const validateFindFavorites = checkSchema(
  {
    profile_id: {
      customSanitizer: {
        options: (value) =>
          customQuerySanitizer<Types.ObjectId>(value, Types.ObjectId as any),
      },
      custom: {
        options: (value) => customQueryValidator(value, objectIdSchema),
      },
      optional: true,
    },
    _id: {
      customSanitizer: {
        options: (value) =>
          customQuerySanitizer<Types.ObjectId>(value, Types.ObjectId as any),
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
        options: (value) => customQuerySanitizer(value, String),
      },
      custom: {
        options: (value) => customQueryValidator(value, stringSchema),
      },
      optional: true,
    },
    favorites: {
      customSanitizer: {
        options: (value) => {
          const result = customQuerySanitizer(value, String);
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
        options: (value) => customQuerySanitizer(value, (v) => new Date(v)),
      },
      custom: {
        options: (value) => customQueryValidator(value, dateSchema),
      },
      optional: true,
    },
  },
  ["query"]
);
