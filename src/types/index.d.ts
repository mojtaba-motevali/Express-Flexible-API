import { IQueryDto } from "interfaces";

export type IFindDTOArgs<T> = Partial<{
  [key in keyof T]:
    | T[key][]
    | T[key]
    | {
        $gte?: T[key];
        $lte?: T[key];
      }
    | { $in: T[key][] };
}> &
  IQueryDto;

export type IFindSelectFieldsArgs<T> = {
  [Property in keyof T]: number;
};
