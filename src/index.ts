import "reflect-metadata";

import express from "express";
import bodyParser from "body-parser";
import { ALLOWED_ORIGINS, DB_URL, NODE_ENV, SERVICE_PORT } from "utils/config";
import { connectToDatabase } from "utils/database";
import cors from "cors";
import { overrideExpressJson } from "utils/common";
import swaggerUi from "swagger-ui-express";
import { InversifyExpressServer } from "inversify-express-utils";
import { bootstrap } from "inversify.config";
import "api";

const _app = express();
overrideExpressJson(_app.response);
const inversifyApp = new InversifyExpressServer(
  bootstrap(),
  null,
  { rootPath: "/api" },
  _app
);
inversifyApp.setConfig((config) => {
  config.use(
    cors({
      origin: ALLOWED_ORIGINS,
    })
  );
  config.use(bodyParser.json());
  config.use(bodyParser.urlencoded({ extended: false }));
  config.use(express.static("public"));
  if (NODE_ENV === "dev") {
    config.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        swaggerOptions: {
          url: "/swagger.json",
        },
      })
    );
  }
});
const app = inversifyApp.build();
app.listen(SERVICE_PORT, async () => {
  console.log(`Server started to listen on ${SERVICE_PORT}`);
  await connectToDatabase(DB_URL);
});

export default app;
