import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const { Schema } = mongoose;

const schema = new Schema(
  {
    name: {
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
type TSchemaBody = typeof Profile.schema.obj;
export type TProfile = {
  [key in keyof TSchemaBody]: TSchemaBody[key];
};
