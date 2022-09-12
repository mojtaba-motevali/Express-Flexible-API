export interface IQueryDto<T> {
  page: number;
  limit: number;
  sort: {
    [key in keyof T]: -1 | 1;
  };
}

export interface IFindQueryRTypeDto<T> {
  rows: T[];
  count?: number;
}
