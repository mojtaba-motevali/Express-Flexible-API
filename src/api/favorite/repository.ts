import { IFindQueryRTypeDto } from "interfaces";
import { ClientSession, PipelineStage } from "mongoose";
import { IFindDTOArgs } from "types";
import { ICreateFavorites, IFindSelectFieldsArgs } from "./dto";
import { Favorite, TFavorite } from "./model";

export const createFavoriteEntities = async (
  params: ICreateFavorites[],
  session: null | ClientSession = null
) => {
  return Favorite.insertMany(params, { lean: true, session });
};
export const findFavoriteEntities = async (
  query: IFindDTOArgs<TFavorite>,
  select: Partial<IFindSelectFieldsArgs>,
  shouldCount = false
): Promise<IFindQueryRTypeDto<Partial<TFavorite>>> => {
  const { limit, page, sort, ...otherFields } = query;
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
  if (sort) {
    aggregateArray.push({
      $sort: sort,
    });
  }
  aggregateArray.push({ $skip: (page - 1) * limit }, { $limit: limit });
  const [rows, count] = await Promise.all([
    Favorite.aggregate(aggregateArray),
    shouldCount ? Favorite.count({ ...otherFields }).lean() : undefined,
  ]);
  return shouldCount
    ? { rows, count }
    : {
        rows,
      };
};
