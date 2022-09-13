import "reflect-metadata";

import express from "express";
import bodyParser from "body-parser";
import { ALLOWED_ORIGINS, DB_URL, NODE_ENV, SERVICE_PORT } from "utils/config";
import { connectToDatabase } from "utils/database";
import cors from "cors";
import { overrideExpressJson } from "utils/common";
import { InversifyExpressServer } from "inversify-express-utils";
import { bootstrap } from "inversify.config";
import * as swagger from "swagger-express-ts";
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
  config.use(
    swagger.express({
      path: "/api-docs/swagger.json",
      definition: {
        basePath: "/api",
        info: {
          title: "Backend-Test",
          version: "1",
        },
      },
    })
  );
  config.use(bodyParser.json());
  config.use(bodyParser.urlencoded({ extended: false }));
  config.use("/api-docs", express.static("swagger"));
  config.use(
    "/api-docs/swagger/assets",
    express.static("node_modules/swagger-ui-dist")
  );

  if (NODE_ENV === "dev") {
  }
});
const app = inversifyApp.build();

app.listen(SERVICE_PORT, async () => {
  console.log(`Server started to listen on ${SERVICE_PORT}`);
  await connectToDatabase(DB_URL);
});

export default app;
