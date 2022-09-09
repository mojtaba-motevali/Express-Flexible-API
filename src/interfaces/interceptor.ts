export type TBody = any;
export interface IBaseInterceptorRType {
  code: number;
  error: boolean;
}
export interface IInterceptorArgs {
  statusCode: number;
  body: TBody;
}

export interface IErrorInterceptorRType extends IBaseInterceptorRType {
  errorDetails:
    | {
        message: string;
      }
    | TBody;
}

export interface IResponseInterceptorRType extends IBaseInterceptorRType {
  data: TBody;
}
