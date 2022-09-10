import { IQueryDto } from "interfaces";
import { TProfile } from "../model";

export interface ICreateProfileDto extends TProfile {}

export interface IFindProfileDtoArgs extends IQueryDto, TProfile {}

export type IFindSelectFieldsArgs = {
  [Property in keyof TProfile]: number;
};
