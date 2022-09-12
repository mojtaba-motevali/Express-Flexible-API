import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { IFindDTOArgs } from "types";
import { queryValidatorSchema } from "utils/common";
import { validate } from "middlewares";
import { Profile, TProfile } from "../model";
import { ProfileService } from "../service";
import { validateFindProfile, validateProfileCreation } from "../validators";

@controller("/profiles")
export class ProfileController {
  @inject(ProfileService) private profileService: ProfileService;

  @httpPost("/", validate(validateProfileCreation))
  async createProfile({ body }: Request, res: Response) {
    try {
      res
        .status(201)
        .json(await this.profileService.createProfile(body.profiles));
    } catch (err) {
      res.status(400).json(err.message);
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
  async findProfiles(
    { query }: Request & { query: IFindDTOArgs<TProfile> },
    res: Response
  ) {
    try {
      res
        .status(200)
        .json(await this.profileService.findProfilesService({ ...query }));
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
}
