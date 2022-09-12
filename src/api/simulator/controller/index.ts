import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { IFindDTOArgs } from "types";
import { queryValidatorSchema } from "utils/common";
import { validate } from "middlewares";
import { Simulator, TSimulator } from "../model";
import { SimulatorService } from "../service";
import {
  validateFindSimulators,
  validateSimulatorCreation,
} from "../validators";

@controller("/simulators")
export class SimulatorController {
  @inject(SimulatorService) private simulatorService: SimulatorService;

  @httpPost("/", validate(validateSimulatorCreation))
  async createSimulators({ body }: Request, res: Response) {
    try {
      res
        .status(201)
        .json(await this.simulatorService.createSimulator(body.simulators));
    } catch (err) {
      res.status(400).json(err.message);
    }
  }

  @httpGet(
    "/",
    validate([
      ...queryValidatorSchema([
        ...Object.keys(Simulator.schema.obj),
        "created_at",
      ]),
      ...validateFindSimulators,
    ])
  )
  async findSimulators(
    {
      query,
    }: Request & {
      query: IFindDTOArgs<TSimulator> & { profile_included: boolean };
    },
    res: Response
  ) {
    try {
      const { profile_included, ...rest } = query;
      res.status(200).json(
        await this.simulatorService.findSimulators({
          ...rest,
          withProfile: profile_included,
        })
      );
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
}
