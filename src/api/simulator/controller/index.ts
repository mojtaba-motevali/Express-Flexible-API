import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { Simulator, SimulatorSchemaKeys, TSimulator } from "../model";
import { SimulatorService } from "../service";
import {
  validateFindSimulators,
  validateSimulatorCreation,
} from "../validators";
import {
  ApiOperationGet,
  ApiOperationPost,
  ApiPath,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";
import {
  CreateSimulatorArgsType,
  CreateSimulatorRType,
  FindSimulatorRType,
} from "../docs";
import { ValidationError } from "../../docs";
import { validate } from "../../../middlewares";
import { IFindDTOArgs } from "../../../types";
import { queryValidatorSchema } from "../../../utils/validator";
import { Logger, LOG_CONTEXT } from "../../../utils/logger";

@ApiPath({
  path: "/simulators",
  name: "Simulators",
  description: "This is simulators",
})
@controller("/simulators")
export class SimulatorController {
  @inject(Logger) private loggerService: Logger;
  @inject(SimulatorService) private simulatorService: SimulatorService;

  @ApiOperationPost({
    description: "Create list of simulators",
    summary: "Create simulators using single request.  ",
    parameters: {
      body: {
        type: typeof CreateSimulatorArgsType,
        model: "CreateSimulatorArgsType",
        required: true,
      },
    },
    responses: {
      201: {
        description: "Success",
        model: "CreateSimulatorRType",
        type: typeof CreateSimulatorRType,
      },
      400: {
        description: "Validation Error",
        model: "ValidationError",
        type: typeof ValidationError,
      },
    },
  })
  @httpPost("/", validate(validateSimulatorCreation))
  async createSimulators({ body }: Request, res: Response) {
    try {
      res
        .status(201)
        .json(await this.simulatorService.createSimulator(body.simulators));
    } catch (err) {
      this.loggerService.emit("error", {
        error: err,
        context: LOG_CONTEXT.CONTROLLER,
        methodName: "createSimulators",
        type: "error",
      });
      res.status(400).json({
        errorDetals: [
          {
            msg: err.message,
          },
        ],
      });
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
  @ApiOperationGet({
    description: "Get simulator  list",
    summary: "Get simulator list by adding various filters.",
    parameters: {
      query: {
        ...SimulatorSchemaKeys.filter(
          (field) => !["cryptocurrency", "profile_id"].includes(field)
        ).reduce((obj, key) => {
          obj[key] = {
            description:
              `filter based on simulator's ${key}.` +
              `This field comes with two filters. \n\n 1- ${key}1|${key}2 => ${key}1 means greater than equal and ` +
              `${key}2 means less than equal of simulator ${key} in database \n\n` +
              `2- ${key}1,${key}2,${key}3 to fetch simulators that have exact ${key} values.`,
            type: "string",
            required: false,
          };
          return obj;
        }, {}),
        profile_id: {
          description:
            "filter based on simulators' cryptocurrency that are separated by comma.",
          type: "string",
          required: false,
        },
        cryptocurrency: {
          description:
            "filter based on simulators' cryptocurrency that are separated by comma.",
          type: "string",
          required: false,
        },
        profile_included: {
          description:
            "Specify 1 to include profile information in the response.",
          required: false,
          type: "number",
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
          description: `This field is used to sort based on allowed fields (${SimulatorSchemaKeys.join(
            " , "
          )} ). specify fields separated by comma (,) and use minus (-) at the beginning of field to specify DESC otherwise it's ASC.`,
          required: false,
          type: SwaggerDefinitionConstant.STRING,
        },
      },
    },
    responses: {
      200: {
        description: "Success",
        model: "FindSimulatorRType",
        type: typeof FindSimulatorRType,
      },
      400: {
        description: "Validation Error",
        model: "ValidationError",
        type: typeof ValidationError,
      },
    },
  })
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
      this.loggerService.emit("error", {
        error: err,
        context: LOG_CONTEXT.CONTROLLER,
        methodName: "createSimulators",
        type: "error",
      });
      res.status(400).json({
        errorDetails: [{ msg: err.message }],
      });
    }
  }
}
