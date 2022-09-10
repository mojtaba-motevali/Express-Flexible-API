import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const { Schema } = mongoose;

const schema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      index: true,
    },
    last_name: {
      type: String,
      required: true,
      index: true,
    },
    nickname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    capital: {
      type: Number,
      index: true,
    },
    divisa: {
      type: String,
    },
    prefered_cryptocurrency: {
      type: String,
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
export const Profile = mongoose.model("Profile", schema);

export type TProfile = {
  first_name: string;
  last_name: string;
  nickname?: string;
  email: string;
  capital: number;
  divisa?: string;
  prefered_cryptocurrency?: string;
};
