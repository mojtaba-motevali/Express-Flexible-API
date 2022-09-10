export interface IQueryDto {
  page: number;
  limit: number;
}

export interface IFindQueryRTypeDto<T> {
  rows: T[];
  count?: number;
}
