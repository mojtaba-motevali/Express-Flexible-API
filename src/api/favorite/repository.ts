import { IFindQueryRTypeDto } from "interfaces";
import { IRepository } from "interfaces/repository";
import { injectable } from "inversify";
import { ClientSession, PipelineStage } from "mongoose";
import { IFindDTOArgs, IFindSelectFieldsArgs } from "types";
import { Favorite, TFavorite } from "./model";

@injectable()
export class FavoriteRepository implements IRepository<TFavorite> {
  async create(params: TFavorite[], session: null | ClientSession = null) {
    return Favorite.insertMany(params, { lean: true, session });
  }
  async find(
    query: IFindDTOArgs<TFavorite>,
    select: Partial<IFindSelectFieldsArgs<TFavorite> & { withProfile: number }>,
    shouldCount = false
  ): Promise<IFindQueryRTypeDto<Partial<TFavorite>>> {
    const { limit, page, sort, ...otherFields } = query;
    const { withProfile, ...otherSelectFields } = select;
    const aggregateArray: PipelineStage[] = [];
    aggregateArray.push({
      $match: { ...otherFields },
    });
    if (withProfile === 1) {
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
  }
}
