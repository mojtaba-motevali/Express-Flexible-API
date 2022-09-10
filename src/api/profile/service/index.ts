import { IFindQueryDto } from "interfaces";
import { ICreateProfileDto, IFindProfileDto } from "../dto";
import { TProfile } from "../model";
import { createProfileEntity, findProfilesEntity } from "../repository";

export const createProfileService = async (params: ICreateProfileDto) => {
  try {
    return await createProfileEntity(params);
  } catch (err) {
    if (err.message.includes("E11000")) {
      throw new Error("Profile already exists!");
    }
  }
};

export const findProfilesService = async (
  params: IFindProfileDto
): Promise<IFindQueryDto<TProfile>> => {
  return findProfilesEntity({ ...params }, {}, true);
};
