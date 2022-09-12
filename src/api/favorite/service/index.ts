import { IFindQueryRTypeDto } from "interfaces";
import { inject, injectable } from "inversify";
import { IFindDTOArgs } from "types";
import { ICreateFavorites } from "../dto";
import { TFavorite } from "../model";
import { FavoriteRepository } from "../repository";

@injectable()
export class FavoriteService {
  @inject(FavoriteRepository) private repository: FavoriteRepository;
  async createFavorites(params: ICreateFavorites[]) {
    return await this.repository.create(params);
  }

  async findFavorites(
    params: IFindDTOArgs<TFavorite> & { withProfile: boolean }
  ): Promise<IFindQueryRTypeDto<Partial<TFavorite>>> {
    try {
      const { withProfile, ...rest } = params;
      return this.repository.find(
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
  }
}
