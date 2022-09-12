import { IErrorInterceptorRType, IInterceptorArgs } from "interfaces";

export const transformErrorResponse = <T>({
  statusCode,
  body,
}: IInterceptorArgs<T>): IErrorInterceptorRType<T> => ({
  error: true,
  code: statusCode,
  errorDetails: body,
});
