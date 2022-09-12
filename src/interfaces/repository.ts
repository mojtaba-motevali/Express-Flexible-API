import { IFindDTOArgs, IFindSelectFieldsArgs } from "types";
import { IFindQueryRTypeDto } from "./query";

export interface IRepository<T> {
  find(
    query: IFindDTOArgs<T>,
    select: Partial<IFindSelectFieldsArgs<T>>,
    shouldCount: boolean
  ): Promise<IFindQueryRTypeDto<Partial<T>>>;

  create(items: T[]): Promise<T[]>;
}
