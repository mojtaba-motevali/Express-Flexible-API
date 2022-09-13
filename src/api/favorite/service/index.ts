import { inject, injectable } from "inversify";
import { IFindQueryRTypeDto } from "../../../interfaces";
import { IFindDTOArgs } from "../../../types";
import { ICreateFavorites } from "../dto";
import { FavoriteSchemaKeys, TFavorite } from "../model";
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
          ...FavoriteSchemaKeys.reduce((prev, curr) => {
            prev[curr] = 1;
            return prev;
          }, {}),
          withProfile,
        },
        true
      );
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
