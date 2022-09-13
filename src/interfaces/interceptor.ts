export interface IBaseInterceptorRType {
  code: number;
  error: boolean;
}
export interface IInterceptorArgs<T> {
  statusCode: number;
  body: T;
}
export interface IErrorInterceptorRType<T> extends IBaseInterceptorRType {
  errorDetails: T;
}
export interface IResponseInterceptorRType<T> extends IBaseInterceptorRType {
  data: T;
}
