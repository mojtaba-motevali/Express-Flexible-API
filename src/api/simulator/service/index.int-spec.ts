import { Profile, TProfile } from "api/profile/model";
import { ProfileService } from "api/profile/service";
import assert from "assert";
import { expect } from "expect";
import { Container } from "inversify";
import { Types } from "mongoose";
import { DB_URL } from "utils/config";
import { connectToDatabase, disconnectFromDatabse } from "utils/database";
import { SimulatorService } from ".";
import { ICreateSimulator } from "../dto";
import { Simulator, TSimulator } from "../model";

describe("Testing Simulator Service", () => {
  let profileService: ProfileService;
  let simulatorService: SimulatorService;
  before(async () => {
    await connectToDatabase(DB_URL);
    const container = new Container();
    container.bind<ProfileService>(ProfileService).to(ProfileService);
    container.bind<SimulatorService>(SimulatorService).to(SimulatorService);
    profileService = container.get(ProfileService);
    simulatorService = container.get(SimulatorService);
  });
  after(async () => {
    await disconnectFromDatabse();
  });
  describe("Create Simulator", () => {
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
      await Simulator.deleteMany({});
    });
    it("It should successfully create simulator.", async () => {
      const simulatorBody: ICreateSimulator = {
        profile_id: profile._id as Types.ObjectId,
        date_recorded: new Date("2022-08-15T07:15:05.580Z"),
        cryptocurrency: "BTC",
        price: 3000,
        euros: 12000,
        quantity: 30000,
      };
      const simulator = await simulatorService.createSimulator([simulatorBody]);
      expect(simulator).toBeDefined();
      if (simulator) {
        expect(simulator[0]).toBeDefined();
        expect(simulator[0]._id).toBeDefined();
        const keys = Object.keys(simulatorBody);
        for (const key of keys) {
          expect(simulator[0][key]).toEqual(simulatorBody[key]);
        }
      }
    });
  });

  describe("Fetch Simulator", () => {
    let simulators: TSimulator[];
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
        simulators = await simulatorService.createSimulator([
          {
            profile_id: profile1._id,
            date_recorded: new Date("2022-08-15T07:15:05.580Z"),
            cryptocurrency: "BTC",
            price: 3000,
            euros: 1500,
            quantity: 30000,
          },
          {
            profile_id: profile2._id,
            date_recorded: new Date("2022-08-15T07:15:05.580Z"),
            cryptocurrency: "BTC",
            price: 3000,
            euros: 1000,
            quantity: 30000,
          },
          {
            profile_id: profile1._id,
            date_recorded: new Date("2022-08-15T07:15:05.580Z"),
            cryptocurrency: "BTC",
            price: 3000,
            euros: 500,
            quantity: 30000,
          },
        ]);
      }
    });
    after(async () => {
      await Simulator.deleteMany({});
      await Profile.deleteMany({});
    });
    it("It should successfully fetch simulators and all required fields should exist.", async () => {
      const result = await simulatorService.findSimulators({
        withProfile: false,
        limit: 1,
        page: 1,
      });
      assert.equal(result.count, 3);
      assert.equal(result.rows.length, 1);
      result.rows.forEach((simulator) => {
        expect(simulator.profile_id).toBeDefined();
        expect(simulator.quantity).toBeDefined();
        expect(simulator.price).toBeDefined();
        expect(simulator.euros).toBeDefined();
        expect(simulator.date_recorded).toBeDefined();
        expect(simulator.cryptocurrency).toBeDefined();
      });
    });
    it("It should successfully fetches simulators with selected profile ids filter.", async () => {
      const result = await simulatorService.findSimulators({
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
    it("It should successfully fetch simulators that have euros within a given range filter", async () => {
      const result = await simulatorService.findSimulators({
        withProfile: false,
        euros: {
          $gte: 300,
          $lte: 1000,
        },
        limit: 1,
        page: 1,
      });
      assert.equal(result.count, 2);
      assert.equal(result.rows.length, 1);
    });
    it("It should successfully fetch Profiles with capital filter", async () => {
      const result = await simulatorService.findSimulators({
        withProfile: false,
        date_recorded: simulators[0].date_recorded,
        limit: 10,
        page: 1,
      });
      assert.equal(result.count, 3);
      assert.equal(result.rows.length, result.count);
    });
  });
});
