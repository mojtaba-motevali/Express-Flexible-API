import { TSimulator } from "../model";

export interface ICreateSimulator extends TSimulator {}

export type IFindSelectFieldsArgs = {
  [Property in keyof TSimulator]: number;
} & { withProfile: boolean };
