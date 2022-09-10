export interface IQueryDto {
  page: number;
  limit: number;
}

export interface IFindQueryDto<T> {
  rows: T[];
  count?: number;
}
