import { IInterceptorArgs } from "interfaces";

import { transformErrorResponse } from "./error";

export const InterceptorJsonBody = (args: IInterceptorArgs) => {
  if (args.statusCode && args.statusCode >= 400) {
    return transformErrorResponse(args);
  }
};
