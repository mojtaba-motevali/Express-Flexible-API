import { IFindQueryRTypeDto } from "interfaces";
import { ICreateProfileDto, IFindProfileDtoArgs } from "../dto";
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
  params: IFindProfileDtoArgs
): Promise<IFindQueryRTypeDto<Partial<TProfile>>> => {
  return findProfilesEntity({ ...params }, {}, true);
};
