import { IFindQueryRTypeDto } from "interfaces";
import { IFindDTOArgs } from "types";
import { ICreateFavorites } from "../dto";
import { TFavorite } from "../model";
import { createFavoriteEntities, findFavoriteEntities } from "../repository";

export const createFavoritesService = async (params: ICreateFavorites[]) => {
  return await createFavoriteEntities(params);
};

export const findFavoriteService = async (
  params: IFindDTOArgs<TFavorite> & { withProfile: boolean }
): Promise<IFindQueryRTypeDto<Partial<TFavorite>>> => {
  try {
    const { withProfile, ...rest } = params;
    return findFavoriteEntities(
      { ...rest },
      {
        _id: 1,
        profile_id: 1,
        name: 1,
        favorites: 1,
        withProfile,
      },
      true
    );
  } catch (err) {
    throw new Error(err.message);
  }
};
