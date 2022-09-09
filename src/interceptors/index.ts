import { IInterceptorArgs } from "interfaces";
import { transformErrorResponse } from "./error";
import { transformResponse } from "./response";

export const InterceptorJsonBody = (args: IInterceptorArgs) => {
  if (args.statusCode && args.statusCode >= 400) {
    return transformErrorResponse(args);
  } else {
    return transformResponse(args);
  }
};
