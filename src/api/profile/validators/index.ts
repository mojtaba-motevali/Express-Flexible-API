import { checkSchema } from "express-validator";
export const validateCreateProfile = checkSchema({
  name: {
    isString: true,
    trim: true,
    isLength: {
      options: { min: 3, max: 50 },
      errorMessage: `name length should be between 3 and 50 characters.`,
    },
    in: ["body"],
  },
  nickname: {
    isString: true,
    trim: true,
    isLength: {
      options: { min: 3, max: 50 },
      errorMessage: `nickname length should be between 3 and 50 characters.`,
    },
    optional: true,
    in: ["body"],
  },
  email: {
    trim: true,
    isEmail: {
      errorMessage: "Invalid Email format provided.",
    },
    in: ["body"],
  },
  capital: {
    toInt: true,
    isInt: true,
    errorMessage: "capital should number.",
    in: ["body"],
  },
  divisa: {
    isString: true,
    trim: true,
    in: ["body"],
  },
  prefered_cryptocurrency: {
    isString: true,
    trim: true,
    optional: true,
    in: ["body"],
  },
});
