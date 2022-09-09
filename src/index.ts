import express from "express";
import bodyParser from "body-parser";
import { SERVICE_PORT } from "utils/config";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(SERVICE_PORT, () => {
  console.log(`Server started to listen on ${SERVICE_PORT}`);
});

export default app;
