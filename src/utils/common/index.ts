import { Response } from "express";
import { InterceptorJsonBody } from "interceptors";

export const overrideExpressJson = (response: Response) => {
  const json = response.json;
  response.json = function (body) {
    const newBody = InterceptorJsonBody({
      statusCode: this.statusCode,
      body,
    });
    return json.call(this, newBody);
  };
};
