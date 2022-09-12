import { Profile, TProfile } from "api/profile/model";
import { createProfileService } from "api/profile/service";
import assert from "assert";
import { expect } from "expect";
import { Types } from "mongoose";
import { DB_URL } from "utils/config";
import { connectToDatabase, disconnectFromDatabse } from "utils/database";
import { createFavoritesService, findFavoriteService } from ".";
import { ICreateFavorites } from "../dto";
import { Favorite, TFavorite } from "../model";

describe("Testing Favorite Service", () => {
  before(async () => {
    await connectToDatabase(DB_URL);
  });
  after(async () => {
    await disconnectFromDatabse();
  });
  describe("Create Favorite", () => {
    let profile: TProfile;
    before(async () => {
      await Profile.deleteMany({});
      profile = (
        await createProfileService([
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
      const favorite = await createFavoritesService([favoriteBody]);
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
      const [profile1, profile2] = await createProfileService([
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
        favorites = await createFavoritesService([
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
      const result = await findFavoriteService({
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
      const result = await findFavoriteService({
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
      const result = await findFavoriteService({
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
