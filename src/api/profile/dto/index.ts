import { IQueryDto } from "interfaces";
import { TProfile } from "../model";

export interface ICreateProfileDto extends Omit<TProfile, "full_name"> {}

export type IFindProfileDtoArgs = Partial<{
  [key in keyof TProfile]: TProfile[key][] | TProfile[key];
}> &
  IQueryDto;

export type IFindSelectFieldsArgs = {
  [Property in keyof TProfile]: number;
};
