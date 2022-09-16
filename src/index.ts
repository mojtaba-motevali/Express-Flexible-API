import "reflect-metadata";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { InversifyExpressServer } from "inversify-express-utils";
import * as swagger from "swagger-express-ts";
import { exceptionHandler, overrideExpressJson } from "./utils/common";
import { bootstrap } from "./inversify.config";
import { connectToDatabase } from "./utils/database";
import {
  ALLOWED_ORIGINS,
  DB_URL,
  NODE_ENV,
  SERVICE_PORT,
} from "./utils/config";
import { Logger } from "./utils/logger";
const container = bootstrap();
const _app = express();
overrideExpressJson(_app.response, container.get(Logger));
const inversifyApp = new InversifyExpressServer(
  container,
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
  if (NODE_ENV === "dev") {
    config.use("/api-docs", express.static("swagger"));
    config.use(
      "/api-docs/swagger/assets",
      express.static("node_modules/swagger-ui-dist")
    );
  }
});
const app = inversifyApp.build();
app.get("/health-check", (req, res) => res.sendStatus(200));
app.use(exceptionHandler(container.get(Logger)));
app.listen(SERVICE_PORT, async () => {
  console.log(`Server started to listen on ${SERVICE_PORT}`);

  await connectToDatabase(DB_URL);
});

export default app;
