import mongoose, { ObjectId, Types } from "mongoose";
import MongooseDelete from "mongoose-delete";

const { Schema } = mongoose;

const schema = new Schema(
  {
    profile_id: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    date_recorded: {
      type: Date,
      required: true,
    },
    cryptocurrency: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      index: true,
    },
    euros: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      index: true,
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
export const Simulator = mongoose.model("Simulators", schema);

export type TSimulator = {
  _id?: Types.ObjectId;
  profile_id?: Types.ObjectId;
  date_recorded: Date;
  cryptocurrency: string;
  price: number;
  euros: number;
  quantity: number;
};
