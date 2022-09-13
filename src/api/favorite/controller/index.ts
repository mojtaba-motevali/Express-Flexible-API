import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { IFindDTOArgs } from "types";
import { queryValidatorSchema } from "utils/common";
import { validate } from "middlewares";
import { ICreateFavorites } from "../dto";
import { FavoriteSchemaKeys, TFavorite } from "../model";
import { FavoriteService } from "../service";
import { validateFavoriteCreation, validateFindFavorites } from "../validators";
import {
  ApiOperationGet,
  ApiOperationPost,
  ApiPath,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";
import {
  CreateArgsType,
  CreateFavoriteError,
  CreateFavoriteRType,
  FindFavoriteRType,
} from "../doc";

@ApiPath({
  path: "/favorites",
  name: "favorites",
  description: "This is favorite",
})
@controller("/favorites")
export class FavoriteController {
  @inject(FavoriteService) private favoriteService: FavoriteService;
  @ApiOperationPost({
    description: "Create list of favorites",
    summary: "Get versions list",
    parameters: {
      body: {
        type: typeof CreateArgsType,
        model: "CreateArgsType",
        required: true,
      },
    },
    responses: {
      201: {
        description: "Success",
        model: "CreateFavoriteRType",
        type: typeof CreateFavoriteRType,
      },
      400: {
        description: "Validation Error",
        model: "CreateFavoriteError",
        type: typeof CreateFavoriteError,
      },
    },
  })
  @httpPost("/", validate(validateFavoriteCreation))
  async createFavorites(
    { body }: { body: { favorites: ICreateFavorites[] } },
    res: Response
  ) {
    try {
      res
        .status(201)
        .json(await this.favoriteService.createFavorites(body.favorites));
    } catch (err) {
      res.status(400).json({
        errorDetails: [{ msg: err.message }],
      });
    }
  }

  @httpGet(
    "/",
    validate([
      ...queryValidatorSchema([...FavoriteSchemaKeys]),
      ...validateFindFavorites,
    ])
  )
  @ApiOperationGet({
    description: "Get versions objects list",
    summary: "Get versions list",
    parameters: {
      query: {
        ...FavoriteSchemaKeys.filter(
          (field) => !["created_at", "name"].includes(field)
        ).reduce((obj, key) => {
          obj[key] = {
            description: `filter based on favorites' ${key} that are separated by comma.`,
            type: "string",
            required: false,
          };
          return obj;
        }, {}),
        name: {
          description:
            "Specify %name to search using regex. \n\n Specify list of names separated by comma (,) to search within names ",
        },
        created_at: {
          description:
            "filter based on favorite's created date." +
            "This field comes with two filters. \n\n 1- D1|D2 => D1 means greater than equal and D2 means less than equal of favorite creation date in database \n\n" +
            "2- D1,D2,D3 to fetch favorites that were created in exact dates.",
        },
        profile_included: {
          description:
            "Specify 1 to include profile information in the response.",
          required: false,
          type: "number",
        },
        limit: {
          description: "This field is used to limit data from server.",
          required: true,
          type: SwaggerDefinitionConstant.NUMBER,
        },
        page: {
          description: "This field is used to paginate data from server.",
          required: true,
          type: SwaggerDefinitionConstant.NUMBER,
        },
        sort: {
          description: `This field is used to sort based on allowed fields (${FavoriteSchemaKeys.join(
            " , "
          )} ). specify fields separated by comma (,) and use minus (-) at the beginning of field to specify DESC otherwise it's ASC.`,
          required: false,
          type: SwaggerDefinitionConstant.STRING,
        },
      },
    },
    responses: {
      200: {
        description: "Success",
        model: "FindFavoriteRType",
        type: typeof FindFavoriteRType,
      },
    },
  })
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
      res.status(400).json({
        errorDetails: [{ msg: err.message }],
      });
    }
  }
}
