import assert from "assert";
import { expect } from "expect";
import { Container } from "inversify";
import { DB_URL } from "utils/config";
import { connectToDatabase, disconnectFromDatabse } from "utils/database";
import { ProfileService } from ".";
import { ICreateProfileDto } from "../dto";
import { Profile, TProfile } from "../model";
import { ProfileRepository } from "../repository";

describe("Testing Profile Service", () => {
  let profileService: ProfileService;
  before(async () => {
    await connectToDatabase(DB_URL);
    const container = new Container();
    container.bind<ProfileRepository>(ProfileRepository).to(ProfileRepository);
    container.bind<ProfileService>(ProfileService).to(ProfileService);
    profileService = container.get(ProfileService);
  });
  after(async () => {
    await disconnectFromDatabse();
  });
  describe("Create Profile", () => {
    afterEach(async () => {
      await Profile.deleteMany({});
    });
    it("It should successfully create profile.", async () => {
      const profileBody: ICreateProfileDto = {
        first_name: "John",
        last_name: "Smith",
        nickname: "Smith Ab",
        email: "smith@gmail.com",
        capital: 200,
        divisa: "awd",
        prefered_cryptocurrency: "USD",
      };
      const profile = await profileService.createProfile([profileBody]);
      expect(profile).toBeDefined();
      if (profile) {
        expect(profile[0]).toBeDefined();
        expect(profile[0]._id).toBeDefined();
        const keys = Object.keys(profileBody);
        for (const key of keys) {
          expect(profile[0][key]).toEqual(profileBody[key]);
        }
      }
    });
    it("It should successfully create profile with optional fields.", async () => {
      const profileBody: ICreateProfileDto = {
        first_name: "John",
        last_name: "Smith",
        email: "smith@gmail.com",
        capital: 200,
      };
      const optionalFields = ["nickname", "divisa", "prefered_cryptocurrency"];
      const profile = await profileService.createProfile([profileBody]);
      expect(profile).toBeDefined();
      if (profile) {
        expect(profile[0]._id).toBeDefined();
        const keys = Object.keys(profileBody);
        keys.forEach((key) => assert.equal(profile[0][key], profileBody[key]));
        optionalFields.forEach((key) =>
          assert.equal(profile[0][key], undefined)
        );
      }
    });
    it("It should fail to create duplicated profile.", async () => {
      const profileBody: ICreateProfileDto = {
        first_name: "John",
        last_name: "Smith",
        nickname: "Smith Ab",
        email: "smith@gmail.com",
        capital: 200,
        divisa: "awd",
        prefered_cryptocurrency: "USD",
      };
      const profile = await profileService.createProfile([profileBody]);
      expect(profile).toBeDefined();
      if (profile) {
        let message = null;
        try {
          await profileService.createProfile([profileBody]);
        } catch (err) {
          message = err.message;
        }
        assert.equal(
          message,
          `Profile with ${profileBody.email} email already exists.`
        );
      }
    });
    it("It should fail to create duplicated profile in the same time.", async () => {
      const profileBody: ICreateProfileDto = {
        first_name: "John",
        last_name: "Smith",
        nickname: "Smith Ab",
        email: "smith@gmail.com",
        capital: 200,
        divisa: "awd",
        prefered_cryptocurrency: "USD",
      };
      let message = null;
      try {
        await profileService.createProfile([profileBody, profileBody]);
      } catch (err) {
        message = err.message;
      }
      assert.equal(
        message,
        `Profile with ${profileBody.email} email already exists.`
      );
    });
  });

  describe("Fetch Profile", () => {
    const profiles: TProfile[] = [
      {
        first_name: "John",
        last_name: "Smith",
        nickname: "Smith Ab",
        email: "smith@gmail.com",
        capital: 200,
        divisa: "awd",
        prefered_cryptocurrency: "USD",
      },
      {
        first_name: "Someone",
        last_name: "else",
        nickname: "Someone else",
        email: "someone@gmail.com",
        capital: 201,
        divisa: "awd",
        prefered_cryptocurrency: "BTC",
      },
      {
        first_name: "optional",
        last_name: "item",
        email: "optional@gmail.com",
        capital: 201,
      },
    ];
    before(async () => {
      await profileService.createProfile(profiles);
    });
    after(async () => {
      await Profile.deleteMany({});
    });
    it("It should successfully fetch Profiles and all required fields should exist.", async () => {
      const result = await profileService.findProfilesService({
        limit: 1,
        page: 1,
      });
      result.rows.forEach((profile) => {
        expect(profile.first_name).toBeDefined();
        expect(profile.last_name).toBeDefined();
        expect(profile.email).toBeDefined();
        expect(profile.capital).toBeDefined();
      });
    });
    it("It should successfully fetches profile with email filter.", async () => {
      const result = await profileService.findProfilesService({
        email: ["smith@gmail.com", "someone@gmail.com"],
        limit: 1,
        page: 1,
      });
      assert.equal(result.count, 2);
      assert.equal(result.rows.length, 1);
      assert.equal(result.rows[0].email, profiles[0].email);
    });
    it("It should successfully fetch Profiles with prefered_cryptocurrency filter", async () => {
      const result = await profileService.findProfilesService({
        prefered_cryptocurrency: "BTC",
        limit: 1,
        page: 1,
      });
      assert.equal(result.count, 1);
      assert.equal(result.rows.length, 1);
      assert.equal(result.rows[0].email, profiles[1].email);
    });
    it("It should successfully fetch Profiles with capital filter", async () => {
      const result = await profileService.findProfilesService({
        capital: 201,
        limit: 1,
        page: 1,
      });
      assert.equal(result.count, 2);
      assert.equal(result.rows.length, 1);
      assert.equal(result.rows[0].email, profiles[1].email);
    });
    it("It should successfully fetch profiles that don't exist", async () => {
      const result = await profileService.findProfilesService({
        capital: 2000,
        limit: 1,
        page: 1,
      });
      expect(result.rows).toBeDefined();
      expect(result.count).toBeDefined();
      assert.equal(result.count, 0);
      assert.equal(result.rows.length, 0);
    });
  });
});
