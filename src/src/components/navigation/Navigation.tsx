import React, { Children } from 'react';
import Box from '../box/Box';
import INavigationProps from '../../interface/INavigationProps';
import { tailwindUtil } from '../../utils/tailwindUtil';

const Navigation: React.FC<INavigationProps> = (props) => {
  const { children, className, activeItem } = props;
  
  return (
    <Box
      className='fixed h-full pt-32 pr-5 -top-10'
    >
      <Box 
        className={
          tailwindUtil(
            "flex flex-col gap-9 pl-2.5 py-5 bg-primary-950 border-primary-500 border-y-2 border-solid rounded-3xl z-50",
            className
          )
        }>
        { children }
      </Box>
      <Box 
        className='
          fixed
          top-16 
          left-11 
          w-10 
          h-[47%] 
          mt-5 
          -z-50 
          rounded-e-full
          pl-8
          flex
          flex-col
          gap-9
          overflow-hidden
          pt-2
        '
      >
        {
          Children.map(children, (child, childIdx) => {
            const label = React.isValidElement(child) ? (child?.props?.children?.props?.label ?? '') : '';
            return  (
              <Box
                data-content={label}
                key={childIdx}
                className={
                  tailwindUtil(
                    'h-14 w-2.5 rounded-e-full bg-primary-300',
                    activeItem?.index === childIdx && 'bg-primary-800',
                  )
                }
              />
            )
          })
        }
      </Box>
    </Box>
  );
}

export default React.memo(Navigation);
