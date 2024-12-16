import React from 'react';
import IIconButtonProps from '../../interface/IIconButtonProps';
import Button from '../button/Button';
import { tailwindUtil } from '../../utils/tailwindUtil';

const IconButton: React.FC<IIconButtonProps> = (props) => {
  const { 
    icon, 
    IconComponentProps,
    ButtonComponentProps,
    onClick,
    active = false 
  } = props;

  return (
    <Button 
      onClick={onClick} 
      {...ButtonComponentProps}
      className={tailwindUtil(
        'flex flex-col items-center min-w-11 min-h-11 p-2.5 rounded-full shadow-solid border-2 border-primary-800', 
        ButtonComponentProps?.className, 
      )}
    >
      {
        React.createElement(icon, {
          ...IconComponentProps, 
          className: tailwindUtil(IconComponentProps?.className, "size-7", active ? 'text-primary-50 size-8' : 'text-primary-500')
        })
      }
    </Button>
  );
}

export default IconButton;
