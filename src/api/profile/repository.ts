import { IFindQueryRTypeDto } from "interfaces";
import {
  ICreateProfileDto,
  IFindProfileDtoArgs,
  IFindSelectFieldsArgs,
} from "./dto";
import { Profile, TProfile } from "./model";

export const createProfileEntity = (params: ICreateProfileDto) => {
  const profile = new Profile(params);
  return profile.save();
};

export const findProfilesEntity = async (
  query: IFindProfileDtoArgs,
  select: Partial<IFindSelectFieldsArgs>,
  shouldCount = false
): Promise<IFindQueryRTypeDto<Partial<TProfile>>> => {
  const { limit, page, ...otherFields } = query;
  const conditions = Object.keys(otherFields).reduce((init, key) => {
    init[key] =
      key == "name" || key === "nickname"
        ? {
            $regex: otherFields[key],
          }
        : otherFields[key];
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
