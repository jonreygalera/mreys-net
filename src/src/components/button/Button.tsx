import React from 'react';
import IButtonProps from '../../interface/IButtonProps';
import { tailwindUtil } from '../../utils/tailwindUtil';

const Button: React.FC<IButtonProps> = (props) => {
  const {
    className,
    children,
    startComponent,
    ...others
  } = props;

  return (
    <button 
      type="button"
      className={tailwindUtil('inline-flex items-center justify-center px-4 py-2 text-sm font-medium hover:translate-y-1', className)}
      {...others}
    >
      {startComponent && startComponent}
      {children}
    </button>
  );
}

export default Button;
