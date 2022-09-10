import assert from "assert";
import { expect } from "expect";
import { DB_URL } from "utils/config";
import { connectToDatabase } from "utils/database";
import { createProfileService } from ".";
import { ICreateProfileDto } from "../dto";
import { Profile, TProfile } from "../model";

describe("Testing Profile Service", () => {
  before(async () => {
    await connectToDatabase(DB_URL);
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
      const profile = await createProfileService([profileBody]);
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
      const profile = await createProfileService([profileBody]);
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
      const profile = await createProfileService([profileBody]);
      expect(profile).toBeDefined();
      if (profile) {
        let message = null;
        try {
          await createProfileService([profileBody]);
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
        await createProfileService([profileBody, profileBody]);
      } catch (err) {
        message = err.message;
      }
      assert.equal(
        message,
        `Profile with ${profileBody.email} email already exists.`
      );
    });
  });
});
