import mongoose from "mongoose";
import { DB_URL } from "utils/config";

export const connectToDatabase = async () => {
  await mongoose.connect(DB_URL);
  console.log(`Connected to MongoDB on ${DB_URL}`);
};
