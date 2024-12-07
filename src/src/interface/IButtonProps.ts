import { PropsWithChildren } from "react";

export default interface IButtonProps extends PropsWithChildren<{}> {
  className?: string,
  onClick?: (event: any)  => void;
  startComponent?: any
}