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
    name: {
      isString: true,
      trim: true,
      isLength: {
        options: { min: 3, max: 50 },
        errorMessage: `name length should be between 3 and 50 characters.`,
      },
      ...commonSchemaValidation<IFindSelectFieldsArgs>({
        locations,
        optionalFields,
        field: "name",
      }),
    },
    nickname: {
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
    email: {
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
    capital: {
      toInt: true,
      isInt: true,
      errorMessage: "capital should number.",
      ...commonSchemaValidation<IFindSelectFieldsArgs>({
        locations,
        optionalFields,
        field: "capital",
      }),
    },
    divisa: {
      isString: true,
      trim: true,
      ...commonSchemaValidation<IFindSelectFieldsArgs>({
        locations,
        optionalFields,
        field: "divisa",
      }),
    },
    prefered_cryptocurrency: {
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
