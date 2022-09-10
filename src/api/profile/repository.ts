import { IFindQueryDto } from "interfaces";
import { ObjectId } from "mongoose";
import {
  ICreateProfileDto,
  IFindProfileDto,
  IFindSelectFieldsArgs,
} from "./dto";
import { Profile, TProfile } from "./model";

export const createProfileEntity = (params: ICreateProfileDto) => {
  const profile = new Profile(params);
  return profile.save();
};
/**
 *
 * @param params
 * @param select
 * @param count
 * @returns {}
 */
export const findProfilesEntity = async (
  params: IFindProfileDto,
  select: Partial<IFindSelectFieldsArgs>,
  shouldCount = false
): Promise<IFindQueryDto<TProfile>> => {
  const { limit, page, ...otherFields } = params;
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
