import { IQueryDto } from "interfaces";
import { TProfile } from "../model";

export interface ICreateProfileDto extends Omit<TProfile, "full_name"> {}
