import mongoose from "mongoose";
import { DB_URL } from "utils/config";

export const connectToDatabase = async () => {
  await mongoose.connect(DB_URL, { autoIndex: false });
  console.log(`Connected to MongoDB on ${DB_URL}`);
};
