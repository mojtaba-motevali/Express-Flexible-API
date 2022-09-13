import { ApiModel } from "swagger-express-ts";

export class IQueryDto<T> {
  page: number;
  limit: number;
  sort: {
    [key in keyof T]: -1 | 1;
  };
}

export class IFindQueryRTypeDto<T> {
  rows: T[];
  count?: number;
}
