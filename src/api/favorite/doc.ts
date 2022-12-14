import { Types } from "mongoose";
import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";
import { Favorite, TFavorite } from "./model";

// ************* Schema **************

@ApiModel({
  description: "Favorite schema",
  name: "Favorite",
})
export class FavoriteSchema {
  @ApiModelProperty({
    description: "Favorite id",
    required: false,
    type: SwaggerDefinitionConstant.STRING,
  })
  _id: Types.ObjectId;
  @ApiModelProperty({
    description: "Favorite's profile id",
    required: true,
    type: SwaggerDefinitionConstant.STRING,
  })
  profile_id: Types.ObjectId;
  @ApiModelProperty({
    description: "Favorite name",
    required: true,
    type: SwaggerDefinitionConstant.STRING,
  })
  name: string;
  @ApiModelProperty({
    description: "Favorites list",
    required: false,
    type: SwaggerDefinitionConstant.ARRAY,
    itemType: SwaggerDefinitionConstant.STRING,
  })
  favorites: string[];
  @ApiModelProperty({
    description: "Favorites date that this entity was created.",
    required: false,
    type: SwaggerDefinitionConstant.STRING,
  })
  created_at: Date;
  @ApiModelProperty({
    description: "Favorites date that this entity was last time updated.",
    required: false,
    type: SwaggerDefinitionConstant.STRING,
  })
  updated_at: Date;
}
// ************* Create Types **************

@ApiModel({
  name: "CreateFavoriteArgsType",
  description: "This Model is used to create favorites.",
})
export class CreateFavoriteArgsType {
  @ApiModelProperty({
    model: "Favorite",
    type: SwaggerDefinitionConstant.ARRAY,
    itemType: "Favorite",
    required: true,
  })
  favorites: FavoriteSchema[];
}

@ApiModel({
  name: "CreateFavoriteRType",
  description: "Return type of find favorite",
})
export class CreateFavoriteRType {
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
    model: "Favorite",
    itemType: typeof Favorite,
    type: SwaggerDefinitionConstant.ARRAY,
    required: true,
  })
  data: RType[];
}

// ************* Find Type **************
@ApiModel({
  name: "FavoriteRType",
  description: "Return type of find favorite",
})
class RType {
  @ApiModelProperty({
    model: "Favorite",
    type: SwaggerDefinitionConstant.ARRAY,
    required: true,
  })
  rows: TFavorite[];
  @ApiModelProperty({
    type: SwaggerDefinitionConstant.NUMBER,
    required: true,
  })
  count: number;
}

@ApiModel({
  name: "FindFavoriteRType",
  description: "Return type of find favorite",
})
export class FindFavoriteRType {
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
    model: "FavoriteRType",
    itemType: typeof RType,
    type: SwaggerDefinitionConstant.ARRAY,
    required: true,
  })
  data: RType[];
}
