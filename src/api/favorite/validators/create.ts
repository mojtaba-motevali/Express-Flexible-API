import { checkSchema } from "express-validator";
import { isValidObjectId } from "mongoose";

export const validateFavoriteCreation = checkSchema(
  {
    "favorites.*.profile_id": {
      isString: true,
      trim: true,
      custom: {
        options: (value) => isValidObjectId(value),
        errorMessage: "profile_id should valid ObjectId.",
      },
    },
    "favorites.*.name": {
      isString: true,
      trim: true,
      isLength: {
        options: { min: 3, max: 200 },
        errorMessage: `name length should be between 3 and 10 characters.`,
      },
    },
    "favorites.*.favorites": {
      isArray: {
        if: (value) =>
          Array.isArray(value) && value.every((val) => typeof val === "string"),
      },
      customSanitizer: {
        options: (value) =>
          Array.isArray(value) ? value.forEach((val) => val.trim()) : value,
      },
    },
  },
  ["body"]
);
