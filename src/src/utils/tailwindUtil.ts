import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { className } from "../types/TClassName";

export const tailwindUtil = (...classNames: className[]) => {
  return twMerge(clsx(...classNames));
};
