export class IBaseInterceptorRType {
  code: number;
  error: boolean;
}
export class IInterceptorArgs<T> {
  statusCode: number;
  body: T;
}

export class IErrorInterceptorRType<T> extends IBaseInterceptorRType {
  errorDetails: T;
}

export class IResponseInterceptorRType<T> extends IBaseInterceptorRType {
  data: T;
}
