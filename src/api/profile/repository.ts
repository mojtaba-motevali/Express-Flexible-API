import { IFindQueryRTypeDto } from "interfaces";
import { ClientSession } from "mongoose";
import { IFindDTOArgs } from "types";
import { ICreateProfileDto, IFindSelectFieldsArgs } from "./dto";
import { Profile, TProfile } from "./model";

export const createProfileEntity = (
  params: ICreateProfileDto[],
  session: null | ClientSession = null
): Promise<TProfile[]> => {
  return Profile.insertMany(
    params.map((param) => ({
      ...param,
      full_name: param.first_name + " " + param.last_name,
    })),
    { lean: true, session }
  );
};

export const findProfilesEntity = async (
  query: IFindDTOArgs<TProfile>,
  select: Partial<IFindSelectFieldsArgs>,
  shouldCount = false
): Promise<IFindQueryRTypeDto<Partial<TProfile>>> => {
  const { limit, page, sort, ...otherFields } = query;
  const [rows, count] = await Promise.all([
    Profile.find({ ...otherFields }, select, {
      sort: sort,
      limit: limit,
      skip: (page - 1) * limit,
    }).lean(),
    shouldCount ? Profile.count({ ...otherFields }).lean() : undefined,
  ]);
  return shouldCount
    ? { rows, count }
    : {
        rows,
      };
};
