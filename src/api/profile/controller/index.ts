import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { Profile, ProfileSchemaKeys, TProfile } from "../model";
import { ProfileService } from "../service";
import { validateFindProfile, validateProfileCreation } from "../validators";
import {
  ApiOperationGet,
  ApiOperationPost,
  ApiPath,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";
import {
  CreateProfileArgsType,
  CreateProfileRType,
  FindProfileRType,
} from "../doc";
import { ValidationError } from "../../docs";
import { validate } from "../../../middlewares";
import { IFindDTOArgs } from "../../../types";
import { queryValidatorSchema } from "../../../utils/common";

@ApiPath({
  path: "/profiles",
  name: "profiles",
  description: "There is set of apis to work with profile resource.",
})
@controller("/profiles")
export class ProfileController {
  @inject(ProfileService) private profileService: ProfileService;

  @httpPost("/", validate(validateProfileCreation))
  @ApiOperationPost({
    description: "Create list of profiles",
    summary: "Get versions list",
    parameters: {
      body: {
        type: typeof CreateProfileArgsType,
        model: "CreateProfileArgsType",
        required: true,
      },
    },
    responses: {
      201: {
        description: "Success",
        model: "CreateProfileRType",
        type: typeof CreateProfileRType,
      },
      400: {
        description: "Validation Error",
        model: "ValidationError",
        type: typeof ValidationError,
      },
    },
  })
  async createProfile({ body }: Request, res: Response) {
    try {
      res
        .status(201)
        .json(await this.profileService.createProfile(body.profiles));
    } catch (err) {
      res.status(400).json(err);
    }
  }

  @httpGet(
    "/",
    validate([
      ...queryValidatorSchema([
        ...Object.keys(Profile.schema.obj),
        "created_at",
      ]),
      ...validateFindProfile,
    ])
  )
  @ApiOperationGet({
    description: "Get profile list",
    summary: "Get profile list by adding various filters.",
    parameters: {
      query: {
        ...ProfileSchemaKeys.filter(
          (field) =>
            ![
              "created_at",
              "first_name",
              "nickname",
              "last_name",
              "name",
            ].includes(field)
        ).reduce((obj, key) => {
          obj[key] = {
            description: `filter based on profiles' ${key} that are separated by comma.`,
            type: "string",
            required: false,
          };
          return obj;
        }, {}),
        full_name: {
          description:
            "Specify %name to search using regex. \n\n Specify list of names separated by comma (,) to search within names ",
        },
        created_at: {
          description:
            "filter based on profile's created date." +
            "This field comes with two filters. \n\n 1- D1|D2 => D1 means greater than equal and D2 means less than equal of profile creation date in database \n\n" +
            "2- D1,D2,D3 to fetch profiles that were created in exact dates.",
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
          description: `This field is used to sort based on allowed fields ( ${ProfileSchemaKeys.join(
            " , "
          )} ).\n\nspecify fields separated by comma (,) and use minus (-) at the beginning of field to specify DESC otherwise it's ASC.`,
          required: false,
          type: SwaggerDefinitionConstant.STRING,
        },
      },
    },
    responses: {
      200: {
        description: "Success",
        model: "FindProfileRType",
        type: typeof FindProfileRType,
      },
      400: {
        description: "Validation Error",
        model: "ValidationError",
        type: typeof ValidationError,
      },
    },
  })
  async findProfiles(
    { query }: Request & { query: IFindDTOArgs<TProfile> },
    res: Response
  ) {
    try {
      res
        .status(200)
        .json(await this.profileService.findProfilesService({ ...query }));
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
