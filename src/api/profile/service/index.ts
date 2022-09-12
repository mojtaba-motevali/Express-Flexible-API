import { IFindQueryRTypeDto } from "interfaces";
import { IFindDTOArgs } from "types";
import { ICreateProfileDto, IFindProfileDtoArgs } from "../dto";
import { TProfile } from "../model";
import { createProfileEntity, findProfilesEntity } from "../repository";

export const createProfileService = async (params: ICreateProfileDto[]) => {
  {
    const newSet = new Set();
    for (const { email } of params) {
      if (newSet.has(email)) {
        throw new Error(`Profile with ${email} email already exists.`);
      }
      newSet.add(email);
    }
  }
  const result = await findProfilesEntity(
    {
      email: params.map(({ email }) => email),
      limit: 1,
      page: 1,
    },
    { email: 1 },
    false
  );
  if (result.rows.length > 0) {
    throw new Error(
      `Profile with ${result.rows[0].email} email already exists.`
    );
  }
  return await createProfileEntity(params);
};

export const findProfilesService = async (
  params: IFindDTOArgs<TProfile>
): Promise<IFindQueryRTypeDto<Partial<TProfile>>> => {
  return findProfilesEntity({ ...params }, {}, true);
};
