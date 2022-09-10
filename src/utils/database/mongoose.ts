import mongoose from "mongoose";

mongoose.connection.on("error", (msg) => {
  console.log("database error", msg);
  process.exit();
});
mongoose.set("debug", true);

export const connectToDatabase = async (url: string) => {
  await mongoose.connect(url, { loggerLevel: "debug" });
  console.log(`Connected to MongoDB on ${url}`);
};
