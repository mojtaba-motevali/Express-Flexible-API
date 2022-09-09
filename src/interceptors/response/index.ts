import { IInterceptorArgs, IResponseInterceptorRType } from "interfaces";

export const transformResponse = ({
  body,
  statusCode,
}: IInterceptorArgs): IResponseInterceptorRType => ({
  error: false,
  code: statusCode,
  data: body,
});
