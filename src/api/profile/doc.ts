import { Types } from "mongoose";
import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";
import { Profile, TProfile } from "./model";

// ************* Schema **************

@ApiModel({
  description: "Profile schema",
  name: "Profile",
})
export class ProfileSchema {
  @ApiModelProperty({
    description: "Profile id",
    required: false,
    type: SwaggerDefinitionConstant.STRING,
  })
  _id: Types.ObjectId;
  @ApiModelProperty({
    description: "Profile's full name",
    required: false,
    type: SwaggerDefinitionConstant.STRING,
  })
  full_name: string;
  @ApiModelProperty({
    description: "Profile's first name",
    required: true,
    type: SwaggerDefinitionConstant.STRING,
  })
  first_name: string;
  @ApiModelProperty({
    description: "Profile's last name",
    required: true,
    type: SwaggerDefinitionConstant.STRING,
  })
  last_name: string;
  @ApiModelProperty({
    description: "Profile's nickname",
    required: false,
    type: SwaggerDefinitionConstant.STRING,
  })
  nickname: string;
  @ApiModelProperty({
    description: "Profile's email",
    required: true,
    type: SwaggerDefinitionConstant.STRING,
  })
  email: string;
  @ApiModelProperty({
    description: "Profile's capital",
    required: true,
    type: SwaggerDefinitionConstant.NUMBER,
  })
  capital: number;
  @ApiModelProperty({
    description: "Profile's divisa",
    required: true,
    type: SwaggerDefinitionConstant.STRING,
  })
  divisa: string;
  @ApiModelProperty({
    description: "Profile's prefered cryptocurrency",
    required: false,
    type: SwaggerDefinitionConstant.STRING,
  })
  prefered_cryptocurrency: string;
  @ApiModelProperty({
    description: "Profile's date that this entity was created.",
    required: false,
    type: SwaggerDefinitionConstant.STRING,
  })
  created_at: Date;
  @ApiModelProperty({
    description: "Profile's date that this entity was last time updated.",
    required: false,
    type: SwaggerDefinitionConstant.STRING,
  })
  updated_at: Date;
}
// ************* Create Types **************

@ApiModel({
  name: "CreateProfileArgsType",
  description: "This Model is used to create profiles.",
})
export class CreateProfileArgsType {
  @ApiModelProperty({
    model: "Profile",
    type: SwaggerDefinitionConstant.ARRAY,
    itemType: "Profile",
    required: true,
  })
  profiles: ProfileSchema[];
}

@ApiModel({
  name: "CreateProfileRType",
  description: "Return type of find profile",
})
export class CreateProfileRType {
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
    model: "Profile",
    itemType: typeof Profile,
    type: SwaggerDefinitionConstant.ARRAY,
    required: true,
  })
  data: RType[];
}

// ************* Find Type **************
@ApiModel({
  name: "RType",
  description: "Return type of find profile",
})
class RType {
  @ApiModelProperty({
    model: "Profile",
    type: SwaggerDefinitionConstant.ARRAY,
    required: true,
  })
  rows: TProfile[];
  @ApiModelProperty({
    type: SwaggerDefinitionConstant.NUMBER,
    required: true,
  })
  count: number;
}

@ApiModel({
  name: "FindProfileRType",
  description: "Return type of find profile",
})
export class FindProfileRType {
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
    model: "RType",
    itemType: typeof RType,
    type: SwaggerDefinitionConstant.ARRAY,
    required: true,
  })
  data: RType[];
}
