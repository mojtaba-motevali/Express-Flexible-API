import { IFindQueryRTypeDto } from "interfaces";
import { IFindDTOArgs } from "types";
import { ICreateSimulator } from "../dto";
import { TSimulator } from "../model";
import { createSimulatorEntities, findSimulatorEntities } from "../repository";

export const createSimulatorService = async (params: ICreateSimulator[]) => {
  return await createSimulatorEntities(params);
};

export const findSimulatorService = async (
  params: IFindDTOArgs<TSimulator> & { withProfile: boolean }
): Promise<IFindQueryRTypeDto<Partial<TSimulator>>> => {
  try {
    const { withProfile, ...rest } = params;
    return findSimulatorEntities(
      { ...rest },
      {
        _id: 1,
        profile_id: 1,
        date_recorded: 1,
        quantity: 1,
        euros: 1,
        price: 1,
        cryptocurrency: 1,
        withProfile,
      },
      true
    );
  } catch (err) {
    throw new Error(err.message);
  }
};
