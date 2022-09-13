import { Types } from "mongoose";
import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";
import { Simulator, TSimulator } from "./model";

// ************* Schema **************

@ApiModel({
  description: "Simulator schema",
  name: "Simulator",
})
export class SimulatorSchema {
  @ApiModelProperty({
    description: "Simulator id",
    required: false,
    type: SwaggerDefinitionConstant.STRING,
  })
  _id: Types.ObjectId;
  @ApiModelProperty({
    description: "Simulator's profile id",
    required: true,
    type: SwaggerDefinitionConstant.STRING,
  })
  profile_id: Types.ObjectId;
  @ApiModelProperty({
    description: "Simulator price",
    required: true,
    type: SwaggerDefinitionConstant.NUMBER,
  })
  price: number;
  @ApiModelProperty({
    description: "Simulator quantity",
    required: true,
    type: SwaggerDefinitionConstant.NUMBER,
  })
  quantity: number;
  @ApiModelProperty({
    description: "Simulator euros",
    required: true,
    type: SwaggerDefinitionConstant.NUMBER,
  })
  euros: number;
  @ApiModelProperty({
    description: "Simulator cryptocurrency",
    required: true,
    type: SwaggerDefinitionConstant.STRING,
  })
  cryptocurrency: string;
  @ApiModelProperty({
    description: "Simulators date that this entity was recorded.",
    required: true,
    type: SwaggerDefinitionConstant.STRING,
  })
  date_recorded: Date;
  @ApiModelProperty({
    description: "Simulators date that this entity was created.",
    required: false,
    type: SwaggerDefinitionConstant.STRING,
  })
  created_at: Date;
  @ApiModelProperty({
    description: "Simulators date that this entity was last time updated.",
    required: false,
    type: SwaggerDefinitionConstant.STRING,
  })
  updated_at: Date;
}
// ************* Create Types **************

@ApiModel({
  name: "CreateSimulatorArgsType",
  description: "This Model is used to create simulators.",
})
export class CreateSimulatorArgsType {
  @ApiModelProperty({
    model: "Simulator",
    type: SwaggerDefinitionConstant.ARRAY,
    itemType: "Simulator",
    required: true,
  })
  simulators: SimulatorSchema[];
}

@ApiModel({
  name: "CreateSimulatorRType",
  description: "Return type of find simulator",
})
export class CreateSimulatorRType {
  @ApiModelProperty({
    type: SwaggerDefinitionConstant.BOOLEAN,
    required: true,
  })
  error: false;
  @ApiModelProperty({
    type: SwaggerDefinitionConstant.NUMBER,
    required: true,
  })
  code: number;
  @ApiModelProperty({
    model: "Simulator",
    itemType: typeof Simulator,
    type: SwaggerDefinitionConstant.ARRAY,
    required: true,
  })
  data: RType[];
}

// ************* Find Type **************
@ApiModel({
  name: "SimulatorRType",
  description: "Return type of find simulator",
})
class RType {
  @ApiModelProperty({
    model: "Simulator",
    type: SwaggerDefinitionConstant.ARRAY,
    required: true,
  })
  rows: TSimulator[];
  @ApiModelProperty({
    type: SwaggerDefinitionConstant.NUMBER,
    required: true,
  })
  count: number;
}

@ApiModel({
  name: "FindSimulatorRType",
  description: "Return type of find simulator",
})
export class FindSimulatorRType {
  @ApiModelProperty({
    type: SwaggerDefinitionConstant.BOOLEAN,
    required: true,
  })
  error: false;
  @ApiModelProperty({
    type: SwaggerDefinitionConstant.NUMBER,
    required: true,
  })
  code: number;
  @ApiModelProperty({
    model: "SimulatorRType",
    itemType: typeof RType,
    type: SwaggerDefinitionConstant.ARRAY,
    required: true,
  })
  data: RType[];
}
