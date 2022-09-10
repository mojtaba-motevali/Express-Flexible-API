import { Request, Response } from "express";
import { IFindProfileDtoArgs } from "../dto";
import { createProfileService, findProfilesService } from "../service";

export const createProfileController = async (
  { body }: Request,
  res: Response
) => {
  try {
    res.status(201).json(await createProfileService(body));
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const findProfilesController = async (
  { query }: Request & { query: IFindProfileDtoArgs },
  res: Response
) => {
  try {
    res.status(200).json(await findProfilesService({ ...query }));
  } catch (err) {
    res.status(400).json(err.message);
  }
};
