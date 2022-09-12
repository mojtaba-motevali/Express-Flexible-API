import { IFindQueryRTypeDto } from "interfaces";
import { inject, injectable } from "inversify";
import { IFindDTOArgs } from "types";
import { ICreateProfileDto } from "../dto";
import { TProfile } from "../model";
import { ProfileRepository } from "../repository";

@injectable()
export class ProfileService {
  @inject(ProfileRepository) private repository: ProfileRepository;
  async createProfile(params: ICreateProfileDto[]) {
    {
      const newSet = new Set();
      for (const { email } of params) {
        if (newSet.has(email)) {
          throw new Error(`Profile with ${email} email already exists.`);
        }
        newSet.add(email);
      }
    }
    const result = await this.repository.find(
      {
        email: params.map(({ email }) => email),
        limit: 1,
        page: 1,
      },
      { email: 1 },
      false
    );
    if (result.rows.length > 0) {
      throw new Error(
        `Profile with ${result.rows[0].email} email already exists.`
      );
    }
    return await this.repository.create(params);
  }
  async findProfilesService(
    params: IFindDTOArgs<TProfile>
  ): Promise<IFindQueryRTypeDto<Partial<TProfile>>> {
    return this.repository.find({ ...params }, {}, true);
  }
}
