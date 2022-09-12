import mongoose, { ObjectId, Types } from "mongoose";
import MongooseDelete from "mongoose-delete";

const { Schema } = mongoose;

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
    timestamps: true,
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
};
