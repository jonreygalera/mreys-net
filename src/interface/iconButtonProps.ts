import { classNameType } from "../types";

export default interface IconButtonProps {
  label: string;
  IconComponent: any; 
  IconComponentProps: any;
  isSelected?: boolean;
  classNameDefault?: classNameType;
  classNameSelected?: classNameType;
  onClick: (event: any)  => void;
}