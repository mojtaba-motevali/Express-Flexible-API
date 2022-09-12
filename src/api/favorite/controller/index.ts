import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { IFindDTOArgs } from "types";
import { queryValidatorSchema } from "utils/common";
import { validate } from "middlewares";
import { ICreateFavorites } from "../dto";
import { Favorite, TFavorite } from "../model";
import { FavoriteService } from "../service";
import { validateFavoriteCreation, validateFindFavorites } from "../validators";
import { Get, Post, Route } from "tsoa";

@Route("favorites")
@controller("/favorites")
export class FavoriteController {
  @inject(FavoriteService) private favoriteService: FavoriteService;

  @httpPost("/", validate(validateFavoriteCreation))
  @Post()
  async createFavorites(
    { body }: { body: { favorites: ICreateFavorites[] } },
    res: Response
  ) {
    try {
      res
        .status(201)
        .json(await this.favoriteService.createFavorites(body.favorites));
    } catch (err) {
      res.status(400).json(err);
    }
  }

  @Get()
  @httpGet(
    "/",
    validate([
      ...queryValidatorSchema([
        ...Object.keys(Favorite.schema.obj),
        "created_at",
      ]),
      ...validateFindFavorites,
    ])
  )
  async findFavorites(
    {
      query,
    }: Request & {
      query: IFindDTOArgs<TFavorite> & { profile_included: boolean };
    },
    res: Response
  ) {
    try {
      const { profile_included, ...rest } = query;
      res.status(200).json(
        await this.favoriteService.findFavorites({
          ...rest,
          withProfile: profile_included,
        })
      );
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
