import { IFindQueryRTypeDto } from "interfaces";
import { ClientSession } from "mongoose";
import {
  ICreateProfileDto,
  IFindProfileDtoArgs,
  IFindSelectFieldsArgs,
} from "./dto";
import { Profile, TProfile } from "./model";

export const createProfileEntity = (
  params: ICreateProfileDto[],
  session: null | ClientSession = null
): Promise<TProfile[]> => {
  return Profile.insertMany(params, { lean: true, ordered: true, session });
};

export const findProfilesEntity = async (
  query: IFindProfileDtoArgs,
  select: Partial<IFindSelectFieldsArgs>,
  shouldCount = false
): Promise<IFindQueryRTypeDto<Partial<TProfile>>> => {
  const { limit, page, ...otherFields } = query;
  const conditions = Object.keys(otherFields).reduce((init, key) => {
    switch (key) {
      case "first_name":
        init[key] = {
          $regex: otherFields[key],
        };
        break;
      case "last_name":
        init[key] = {
          $regex: otherFields[key],
        };
      case "email":
        init[key] =
          typeof otherFields[key] == "string"
            ? otherFields[key]
            : {
                $in: otherFields[key],
              };
        break;
      default:
        init[key] = otherFields[key];
    }
    return init;
  }, {});
  const [rows, count] = await Promise.all([
    Profile.find({ ...conditions }, select, {
      limit: limit,
      skip: (page - 1) * limit,
    }).lean(),
    shouldCount ? Profile.count({ ...conditions }).lean() : undefined,
  ]);
  return shouldCount
    ? { rows, count }
    : {
        rows,
      };
};
