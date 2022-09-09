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
    },
    capital: {
      type: Number,
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
  }
);

schema.plugin(MongooseDelete, {
  deletedAt: true,
});

export const Profile = mongoose.model("Profile", schema);
