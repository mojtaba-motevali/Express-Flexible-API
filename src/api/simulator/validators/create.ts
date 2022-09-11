import { checkSchema } from "express-validator";
import { isValidObjectId } from "mongoose";

export const validateSimulatorCreation = checkSchema(
  {
    "simulators.*.profile_id": {
      isString: true,
      trim: true,
      custom: {
        options: (value) => isValidObjectId(value),
        errorMessage: "profile_id should valid ObjectId.",
      },
    },
    "simulators.*.cryptocurrency": {
      isString: true,
      trim: true,
      isLength: {
        options: { min: 3, max: 10 },
        errorMessage: `cryptocurrency length should be between 3 and 10 characters.`,
      },
    },
    "simulators.*.date_recorded": {
      isString: true,
      toDate: true,
    },
    "simulators.*.euros": {
      isNumeric: true,
      toFloat: true,
      errorMessage: "euros should number.",
    },
    "simulators.*.price": {
      isNumeric: true,
      toFloat: true,
      errorMessage: "price should number.",
    },
    "simulators.*.quantity": {
      isNumeric: true,
      toFloat: true,
      errorMessage: "quantity should number.",
    },
  },
  ["body"]
);
