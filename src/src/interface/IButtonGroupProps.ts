import { PropsWithChildren } from "react";

export default interface IButtonGroupProps extends PropsWithChildren<{}>{
  max?: number;
  label?: string
}