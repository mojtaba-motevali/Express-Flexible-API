import express from "express";
import bodyParser from "body-parser";
import { ALLOWED_ORIGINS, SERVICE_PORT } from "utils/config";
import { connectToDatabase } from "utils/database";
import cors from "cors";
import { overrideExpressJson } from "utils/common";

const app = express();
overrideExpressJson(app.response);
app.use(
  cors({
    origin: ALLOWED_ORIGINS,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(SERVICE_PORT, async () => {
  console.log(`Server started to listen on ${SERVICE_PORT}`);
  await connectToDatabase();
});

export default app;
