import { IInterceptorArgs } from "interfaces";
import { transformErrorResponse } from "./error";
import { transformResponse } from "./response";

export const InterceptorJsonBody = <T>(args: IInterceptorArgs<T>) => {
  if (args.statusCode && args.statusCode >= 400) {
    return transformErrorResponse(args);
  } else {
    return transformResponse(args);
  }
};
