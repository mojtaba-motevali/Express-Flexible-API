import { IFindQueryRTypeDto } from "interfaces";
import { inject, injectable } from "inversify";
import { IFindDTOArgs } from "types";
import { ICreateSimulator } from "../dto";
import { TSimulator } from "../model";
import { SimulatorRepository } from "../repository";

@injectable()
export class SimulatorService {
  @inject(SimulatorRepository) private simulator: SimulatorRepository;
  async createSimulator(params: ICreateSimulator[]) {
    return await this.simulator.create(params);
  }
  async findSimulators(
    params: IFindDTOArgs<TSimulator> & { withProfile: boolean }
  ): Promise<IFindQueryRTypeDto<Partial<TSimulator>>> {
    try {
      const { withProfile, ...rest } = params;
      return this.simulator.find(
        { ...rest },
        {
          _id: 1,
          profile_id: 1,
          date_recorded: 1,
          quantity: 1,
          euros: 1,
          price: 1,
          cryptocurrency: 1,
          withProfile,
        },
        true
      );
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
