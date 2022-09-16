import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { InterceptorJsonBody } from "../../interceptors";
import { Logger, LOG_CONTEXT } from "../logger";

export const overrideExpressJson = (response: Response, logger: Logger) => {
  const json = response.json;
  response.json = function (body) {
    if (body.swagger) {
      return json.call(this, body);
    }
    if (typeof body === "string") throw new Error("string is not typeof json");
    if (this.statusCode >= 400 && this.statusCode < 500) {
      logger.emit("info", {
        clientIp: this.socket.remoteAddress,
        context: LOG_CONTEXT.HTTP,
        type: "error",
        requestType: "response",
        status: this.statusCode,
        url: this.req.originalUrl,
        data: body,
      });
    }
    const newBody = InterceptorJsonBody({
      statusCode: this.statusCode,
      body,
    });
    return json.call(this, newBody);
  };
};

export const exceptionHandler = (logger: Logger) => {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.emit("error", {
      error: err,
      context: LOG_CONTEXT.MIDDLEWARE,
      methodName: "exceptionHandler",
      type: "error",
    });
    res.status(500).json({ message: err.message });
  };
};
