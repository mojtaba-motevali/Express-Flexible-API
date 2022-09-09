import express, { Response } from "express";
import bodyParser from "body-parser";
import { ALLOWED_ORIGINS, SERVICE_PORT } from "utils/config";
import { connectToDatabase } from "utils/database";
import cors from "cors";
import { InterceptorJsonBody } from "interceptors";

const app = express();
{
  const json = app.response.json;
  app.response.json = function (body) {
    const newBody = InterceptorJsonBody({
      statusCode: this.statusCode,
      body,
    });
    return json.call(this, newBody);
  };
}
app.use(
  cors({
    origin: ALLOWED_ORIGINS,
  })
);
app.get("/", (req, res) => {
  res.status(400).json({
    field: "ahahah",
  });
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(SERVICE_PORT, async () => {
  console.log(`Server started to listen on ${SERVICE_PORT}`);
  await connectToDatabase();
});

export default app;
