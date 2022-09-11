import { IQueryDto } from "interfaces";

export type IFindDTOArgs<T> = Partial<{
  [key in keyof T]: T[key][] | T[key];
}> &
  IQueryDto;
