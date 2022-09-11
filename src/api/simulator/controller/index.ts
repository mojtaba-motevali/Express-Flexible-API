import { Request, Response } from "express";
import { IFindDTOArgs } from "types";
import { TSimulator } from "../model";
import { createSimulatorService, findSimulatorService } from "../service";

export const createSimulatorController = async (
  { body }: Request,
  res: Response
) => {
  try {
    res.status(201).json(await createSimulatorService(body.simulators));
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const findSimulatorController = async (
  {
    query,
  }: Request & {
    query: IFindDTOArgs<TSimulator> & { profile_included: boolean };
  },
  res: Response
) => {
  try {
    const { profile_included, ...rest } = query;
    res.status(200).json(
      await findSimulatorService({
        ...rest,
        withProfile: profile_included,
      })
    );
  } catch (err) {
    res.status(400).json(err.message);
  }
};
