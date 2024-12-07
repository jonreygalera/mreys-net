import React, { PropsWithChildren } from "react";
import { TTypographyVariant } from "../types/TTypography";

export default interface ITypographyProps extends PropsWithChildren<{}>{
  variant?: TTypographyVariant;
  as?: any,
  className?: string;
  style?: React.CSSProperties
}