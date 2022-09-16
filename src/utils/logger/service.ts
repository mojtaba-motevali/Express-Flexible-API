import EventEmitter from "events";
import { injectable } from "inversify";
import winston, { format, transports } from "winston";
import { IBaseLogger, IErrorLogger, ILoggerEvents, LOG_LEVELS } from "./types";

export declare interface Logger {
  on<T extends keyof ILoggerEvents>(event: T, listener: ILoggerEvents[T]);
  emit<T extends keyof ILoggerEvents>(
    event: T,
    ...args: Parameters<ILoggerEvents[T]>
  );
}
@injectable()
export class Logger extends EventEmitter {
  private _logger: winston.Logger;
  constructor() {
    super();
    this.on("info", this.logInfo);
    this.on("error", this.logError);
    this._logger = winston.createLogger({
      levels: LOG_LEVELS,
      format: format.combine(format.timestamp(), format.json()),
      transports: [new transports.Console()],
    });
    return this;
  }
  private logError({ error, ...rest }: IErrorLogger) {
    const errObject = {
      stack: error.stack ? error.stack : null,
      message: error.message ? error.message : null,
      name: error.name ? error.name : null,
    };
    this._logger.error(
      JSON.stringify({
        error: { ...errObject },
        ...rest,
      })
    );
  }
  private logInfo(params: IBaseLogger) {
    this._logger.info(JSON.stringify(params));
  }
}
