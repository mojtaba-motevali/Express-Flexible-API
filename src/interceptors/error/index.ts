import { IErrorInterceptorRType, IInterceptorArgs } from "interfaces";

export const transformErrorResponse = (
  res: IInterceptorArgs
): IErrorInterceptorRType => ({
  error: true,
  code: res.statusCode,
  errorDetails:
    typeof res.body === "string"
      ? {
          message: res.body,
        }
      : res.body,
});
