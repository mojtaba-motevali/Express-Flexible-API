import mongoose from "mongoose";
import { DB_URL } from "utils/config";

mongoose.connection.on("error", (msg) => {
  console.log("database error", msg);
  process.exit();
});
mongoose.set("debug", true);

export const connectToDatabase = async () => {
  await mongoose.connect(DB_URL, { loggerLevel: "debug" });
  console.log(`Connected to MongoDB on ${DB_URL}`);
};
