import { IFindQueryRTypeDto, IQueryDto } from "interfaces";
import { ClientSession, PipelineStage } from "mongoose";
import { IFindDTOArgs } from "types";
import { ICreateSimulator, IFindSelectFieldsArgs } from "./dto";
import { Simulator, TSimulator } from "./model";

export const createSimulatorEntities = async (
  params: ICreateSimulator[],
  session: null | ClientSession = null
) => {
  return Simulator.insertMany(params, { ordered: true, session });
};
export const findSimulatorEntities = async (
  query: IFindDTOArgs<TSimulator>,
  select: Partial<IFindSelectFieldsArgs>,
  shouldCount = false
): Promise<IFindQueryRTypeDto<Partial<TSimulator>>> => {
  const { limit, page, ...otherFields } = query;
  const { withProfile, ...otherSelectFields } = select;
  const aggregateArray: PipelineStage[] = [];
  aggregateArray.push({
    $match: { ...otherFields },
  });
  if (withProfile) {
    aggregateArray.push(
      {
        $lookup: {
          as: "profile",
          from: "profiles",
          localField: "profile_id",
          foreignField: "_id",
        },
      },
      { $unwind: "$profile" }
    );
  }
  aggregateArray.push({
    $project: withProfile
      ? { ...otherSelectFields, profile: "$profile" }
      : otherSelectFields,
  });
  const [rows, count] = await Promise.all([
    Simulator.aggregate([
      ...aggregateArray,
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
    ]),
    shouldCount ? Simulator.count({ ...otherFields }).lean() : undefined,
  ]);
  return shouldCount
    ? { rows, count }
    : {
        rows,
      };
};
