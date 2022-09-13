import { injectable } from "inversify";
import { ClientSession } from "mongoose";
import { IFindQueryRTypeDto, IRepository } from "../../interfaces";
import { IFindDTOArgs, IFindSelectFieldsArgs } from "../../types";
import { ICreateProfileDto } from "./dto";
import { Profile, TProfile } from "./model";

@injectable()
export class ProfileRepository implements IRepository<TProfile> {
  constructor() {}
  async create(
    params: ICreateProfileDto[],
    session: null | ClientSession = null
  ): Promise<TProfile[]> {
    return Profile.insertMany(
      params.map((param) => ({
        ...param,
        full_name: param.first_name + " " + param.last_name,
      })),
      { lean: true, session }
    );
  }

  async find(
    query: IFindDTOArgs<TProfile>,
    select: Partial<IFindSelectFieldsArgs<TProfile>>,
    shouldCount = false
  ): Promise<IFindQueryRTypeDto<Partial<TProfile>>> {
    const { limit, page, sort, ...otherFields } = query;
    const [rows, count] = await Promise.all([
      Profile.find({ ...otherFields }, select)
        .sort(sort)
        .limit(limit)
        .skip((page - 1) * limit)
        .lean(),
      shouldCount ? Profile.count({ ...otherFields }).lean() : undefined,
    ]);
    return shouldCount
      ? { rows, count }
      : {
          rows,
        };
  }
}
