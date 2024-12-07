import React from 'react';
import { tailwindUtil } from '../../utils/tailwindUtil';
import IBoxProps from '../../interface/IBoxProps';

const Box: React.FC<IBoxProps> = ({children, className, ...others}) => {
  return (
    children ? (
      <div 
      {...others}
      className={tailwindUtil(className)}
    >
      { children }
    </div>
    ) : <div {...others}
    className={tailwindUtil(className)}/>
  );
}

export default Box;
