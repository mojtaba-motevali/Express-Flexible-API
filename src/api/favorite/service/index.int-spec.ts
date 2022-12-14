import "reflect-metadata";

import assert from "assert";
import { expect } from "expect";
import { Container } from "inversify";
import { Types } from "mongoose";
import { FavoriteService } from ".";
import { ICreateFavorites } from "../dto";
import { Favorite, TFavorite } from "../model";
import { FavoriteRepository } from "../repository";
import { ProfileService } from "../../profile/service";
import {
  connectToDatabase,
  disconnectFromDatabse,
} from "../../../utils/database";
import { ProfileRepository } from "../../profile/repository";
import { Profile, TProfile } from "../../profile/model";
import { DB_URL } from "../../../utils/config";

describe("Testing Favorite Service", () => {
  let profileService: ProfileService;
  let favoriteService: FavoriteService;
  before(async () => {
    await connectToDatabase(DB_URL);
    const container = new Container();
    container
      .bind<ProfileRepository>(ProfileRepository)
      .toSelf()
      .inSingletonScope();
    container
      .bind<FavoriteRepository>(FavoriteRepository)
      .toSelf()
      .inSingletonScope();
    container.bind<ProfileService>(ProfileService).toSelf().inSingletonScope();
    container
      .bind<FavoriteService>(FavoriteService)
      .toSelf()
      .inSingletonScope();
    profileService = container.get(ProfileService);
    favoriteService = container.get(FavoriteService);
  });
  after(async () => {
    await disconnectFromDatabse();
  });
  describe("Create Favorite", () => {
    let profile: TProfile;
    before(async () => {
      await Profile.deleteMany({});
      profile = (
        await profileService.createProfile([
          {
            first_name: "John",
            last_name: "Smith",
            nickname: "Smith Ab",
            email: "smith@gmail.com",
            capital: 200,
            divisa: "awd",
            prefered_cryptocurrency: "BTC",
          },
        ])
      )[0];
    });
    after(async () => {
      await Profile.deleteMany({});
    });
    afterEach(async () => {
      await Favorite.deleteMany({});
    });
    it("It should successfully create favorite.", async () => {
      const favoriteBody: ICreateFavorites = {
        profile_id: profile._id as Types.ObjectId,
        name: "My Favorite",
        favorites: ["Hi hI", "Hello"],
      };
      const favorite = await favoriteService.createFavorites([favoriteBody]);
      expect(favorite).toBeDefined();
      if (favorite) {
        expect(favorite[0]).toBeDefined();
        expect(favorite[0]._id).toBeDefined();
        const keys = Object.keys(favoriteBody);
        for (const key of keys) {
          expect(favorite[0][key]).toEqual(favoriteBody[key]);
        }
      }
    });
  });

  describe("Fetch Favorite", () => {
    let favorites: TFavorite[];
    let profileIds: Types.ObjectId[];
    before(async () => {
      const [profile1, profile2] = await profileService.createProfile([
        {
          first_name: "John",
          last_name: "Smith",
          nickname: "Smith Ab",
          email: "smith@gmail.com",
          capital: 200,
          divisa: "awd",
          prefered_cryptocurrency: "BTC",
        },
        {
          first_name: "Abby",
          last_name: "bell",
          nickname: "Abby bel",
          email: "abby@gmail.com",
          capital: 200,
          divisa: "aawd",
          prefered_cryptocurrency: "BTC",
        },
      ]);
      if (profile1._id && profile2._id) {
        profileIds = [profile1._id, profile2._id];
        favorites = await favoriteService.createFavorites([
          {
            profile_id: profile1._id,
            name: "My Favorite 1",
            favorites: ["Heart", "Arm", "Leg"],
          },
          {
            profile_id: profile2._id,
            name: "My Favorite 2",
            favorites: ["Coffe"],
          },
          {
            profile_id: profile1._id,
            name: "My Favorite 3",
            favorites: ["Coffe", "BadDay"],
          },
        ]);
      }
    });
    after(async () => {
      await Favorite.deleteMany({});
      await Profile.deleteMany({});
    });
    it("It should successfully fetch favorites and all required fields should exist.", async () => {
      const result = await favoriteService.findFavorites({
        withProfile: false,
        limit: 1,
        page: 1,
      });
      assert.equal(result.count, 3);
      assert.equal(result.rows.length, 1);
      result.rows.forEach((favorite) => {
        expect(favorite.profile_id).toBeDefined();
        expect(favorite.name).toBeDefined();
        expect(favorite.favorites).toBeDefined();
      });
    });
    it("It should successfully fetches favorites with selected profile ids filter.", async () => {
      const result = await favoriteService.findFavorites({
        profile_id: {
          $in: profileIds,
        },
        withProfile: false,
        limit: 1,
        page: 1,
      });
      assert.equal(result.count, 3);
      assert.equal(result.rows.length, 1);
    });
    it("It should successfully fetch favorites with favorites list filter", async () => {
      const result = await favoriteService.findFavorites({
        withProfile: false,
        favorites: {
          $in: [favorites[1].favorites[0]],
        },
        limit: 1,
        page: 1,
      });
      assert.equal(result.count, 2);
      assert.equal(result.rows.length, 1);
    });
  });
});
