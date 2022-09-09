import { IErrorInterceptorRType, IInterceptorArgs } from "interfaces";

export const transformErrorResponse = ({
  statusCode,
  body,
}: IInterceptorArgs): IErrorInterceptorRType => ({
  error: true,
  code: statusCode,
  errorDetails:
    typeof body === "string"
      ? {
          message: body,
        }
      : body,
});
