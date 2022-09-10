import { checkSchema, Location } from "express-validator";
import { commonSchemaValidation } from "utils/common";
import { IFindSelectFieldsArgs } from "../dto";

interface IValidateProfileDTO {
  locations: Location[];
  optionalFields: (keyof IFindSelectFieldsArgs | "*")[];
}

export const validateProfile = ({
  locations,
  optionalFields,
}: IValidateProfileDTO) => {
  return checkSchema({
    "profiles.*.first_name": {
      isString: true,
      trim: true,
      isLength: {
        options: { min: 3, max: 50 },
        errorMessage: `first_name length should be between 3 and 50 characters.`,
      },
      ...commonSchemaValidation<IFindSelectFieldsArgs>({
        locations,
        optionalFields,
        field: "first_name",
      }),
    },
    "profiles.*.last_name": {
      isString: true,
      trim: true,
      isLength: {
        options: { min: 3, max: 50 },
        errorMessage: `last_name length should be between 3 and 50 characters.`,
      },
      ...commonSchemaValidation<IFindSelectFieldsArgs>({
        locations,
        optionalFields,
        field: "last_name",
      }),
    },
    "profiles.*.nickname": {
      isString: true,
      trim: true,
      isLength: {
        options: { min: 3, max: 50 },
        errorMessage: `nickname length should be between 3 and 50 characters.`,
      },
      ...commonSchemaValidation<IFindSelectFieldsArgs>({
        locations,
        optionalFields,
        field: "nickname",
      }),
    },
    "profiles.*.email": {
      trim: true,
      isEmail: {
        errorMessage: "Invalid Email format provided.",
      },
      ...commonSchemaValidation<IFindSelectFieldsArgs>({
        locations,
        optionalFields,
        field: "email",
      }),
    },
    "profiles.*.capital": {
      toInt: true,
      isInt: true,
      errorMessage: "capital should number.",
      ...commonSchemaValidation<IFindSelectFieldsArgs>({
        locations,
        optionalFields,
        field: "capital",
      }),
    },
    "profiles.*.divisa": {
      isString: true,
      trim: true,
      ...commonSchemaValidation<IFindSelectFieldsArgs>({
        locations,
        optionalFields,
        field: "divisa",
      }),
    },
    "profiles.*.prefered_cryptocurrency": {
      isString: true,
      trim: true,
      ...commonSchemaValidation<IFindSelectFieldsArgs>({
        locations,
        optionalFields,
        field: "prefered_cryptocurrency",
      }),
    },
  });
};
