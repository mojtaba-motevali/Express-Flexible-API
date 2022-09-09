import express from "express";
import bodyParser from "body-parser";
import { SERVICE_PORT } from "utils/config";
import { connectToDatabase } from "utils/database";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.listen(SERVICE_PORT, async () => {
  console.log(`Server started to listen on ${SERVICE_PORT}`);
  await connectToDatabase();
});

export default app;
