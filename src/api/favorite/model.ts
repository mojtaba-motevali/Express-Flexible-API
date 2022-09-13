import mongoose, { Schema } from "mongoose";
import MongooseDelete from "mongoose-delete";
import { Types } from "mongoose";
const schema = new Schema(
  {
    profile_id: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    name: {
      type: String,
      required: true,
    },
    favorites: {
      type: [String],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    autoCreate: true,
  }
);
schema.plugin(MongooseDelete, {
  deletedAt: true,
});
export const Favorite = mongoose.model("Favorites", schema);
export type TFavorite = {
  _id?: Types.ObjectId;
  profile_id?: Types.ObjectId;
  name: string;
  favorites: string[];
  created_at?: Date;
  updated_at?: Date;
};

export const FavoriteSchemaKeys = [
  ...Object.keys(Favorite.schema.obj),
  "_id",
  "created_at",
];
