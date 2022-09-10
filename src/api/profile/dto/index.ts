import { IQueryDto } from "interfaces";
import { InferSchemaType } from "mongoose";
import { Profile, TProfile } from "../model";

export interface ICreateProfileDto {
  name: String;
  nickname: String;
  email: String;
  capital: Number;
  divisa: String;
  prefered_cryptocurrency: String;
}

export interface IFindProfileDto extends IQueryDto, TProfile {}

export type IFindSelectFieldsArgs = {
  [Property in keyof TProfile]: number;
};
