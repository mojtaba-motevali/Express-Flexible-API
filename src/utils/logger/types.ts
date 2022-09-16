export const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};
export enum LOG_CONTEXT {
  HTTP = "http",
  SERVICE = "service",
  CONTROLLER = "controller",
  MIDDLEWARE = "middleware",
}

export interface IBaseLogger {
  type: keyof typeof LOG_LEVELS;
  context: LOG_CONTEXT;
}
export interface IErrorLogger extends IBaseLogger {
  error: Error;
  methodName: string;
}
export interface IHttpLogger extends IBaseLogger {
  url: string;
  clientIp: string;
  requestType: "response" | "request";
  status: number;
  data: string;
}
export interface ILoggerEvents {
  info: (params: IHttpLogger) => void;
  error: (params: IErrorLogger) => void;
}
