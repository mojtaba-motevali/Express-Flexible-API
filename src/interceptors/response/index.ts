import { IInterceptorArgs, IResponseInterceptorRType } from "interfaces";

export const transformResponse = <T>({
  body,
  statusCode,
}: IInterceptorArgs<T>): IResponseInterceptorRType<T> => ({
  error: false,
  code: statusCode,
  data: body,
});
