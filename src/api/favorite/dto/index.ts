import { TFavorite } from "../model";

export interface ICreateFavorites extends TFavorite {}

export type IFindSelectFieldsArgs = {
  [Property in keyof TFavorite]: number;
} & { withProfile: boolean };
