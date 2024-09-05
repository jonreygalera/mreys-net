import React from "react";
import { classNameType } from "../../../types";
import { IconButtonProps } from "../../../interface";


function processDefaultDivOuterContainerClassName(currentClassName : string[], classNameDefault : classNameType) {
  if(classNameDefault) {
    if(typeof classNameDefault === 'string') {
      currentClassName.push(classNameDefault);
    } else {
      currentClassName.push(classNameDefault.join(" "));
    }
  }
  return currentClassName.join(" ");
}

function processSelectedDivOuterContainerClassName(currentClassName : string[], classNameDefault : classNameType, defaultClassName = "border-b border-primary-50") {
  if(classNameDefault) {
    if(typeof classNameDefault === 'string') {
      currentClassName.push(classNameDefault);
    } else {
      currentClassName.push(classNameDefault.join(" "));
    }
  } else  {
    currentClassName.push(defaultClassName);
  }
  return currentClassName.join(" ");
}

export default function IconButton(props : IconButtonProps) {
  const { 
    label, 
    IconComponent, 
    IconComponentProps,
    isSelected = false,
    classNameDefault = null,
    classNameSelected = null,
    onClick
   } = props;

  const divOuterContainerClassName = ["flex", "items-center", "justify-center", "rounded-xl", "max-w-11", "max-h-11", "min-w-11", "min-h-11"];
  let iconClassName = " text-primary-400";
  const labelClassName = ["text-xs"];


  if(isSelected) {
    divOuterContainerClassName.push(processSelectedDivOuterContainerClassName(divOuterContainerClassName, classNameSelected));
    labelClassName.push("text-primary-50");
    iconClassName = " text-primary-50";
  } else {
    labelClassName.push("text-primary-400");
  }

  const defaultClassName = processDefaultDivOuterContainerClassName(divOuterContainerClassName, classNameDefault);

  return (
    <div className={defaultClassName}>
      <button className="flex flex-col items-center" onClick={onClick}>
        {
          React.createElement(IconComponent, {...IconComponentProps, className: IconComponentProps.className + iconClassName })
        }
        { !isSelected && <span className={labelClassName.join(" ")}>{label}</span> }
      </button>
    </div>
  )
}