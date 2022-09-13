import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";

@ApiModel({
  name: "ErrorDetails",
})
class ErrorDetails {
  @ApiModelProperty({
    type: SwaggerDefinitionConstant.STRING,
  })
  msg: string;
  @ApiModelProperty({
    type: SwaggerDefinitionConstant.STRING,
  })
  value?: string;
  @ApiModelProperty({
    type: SwaggerDefinitionConstant.STRING,
  })
  param?: string;
  @ApiModelProperty({
    type: SwaggerDefinitionConstant.STRING,
  })
  location?: string;
}
@ApiModel({
  name: "ValidationError",
  description: "Return type of find profile",
})
export class ValidationError {
  @ApiModelProperty({
    type: SwaggerDefinitionConstant.BOOLEAN,
    required: true,
  })
  error: true;
  @ApiModelProperty({
    type: SwaggerDefinitionConstant.NUMBER,
    required: true,
  })
  code: number;
  @ApiModelProperty({
    model: "ErrorDetails",
    itemType: typeof ErrorDetails,
    type: SwaggerDefinitionConstant.ARRAY,
    required: true,
  })
  errorDetails: ErrorDetails[];
}
