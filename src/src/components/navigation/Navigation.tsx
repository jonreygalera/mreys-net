import React, { Children } from 'react';
import Box from '../box/Box';
import INavigationProps from '../../interface/INavigationProps';
import { tailwindUtil } from '../../utils/tailwindUtil';
import Typography from '../typography/Typography';

const Navigation: React.FC<INavigationProps> = (props) => {
  const { children, className, activeItem } = props;
  
  return (
    <Box
      className='fixed h-full pt-32 pr-5 -top-20 w-[15%] wide-screen:w-[10%] z-50'
    >
      <Box 
        className={
          tailwindUtil(
            "bg-primary-950 border-primary-500 border-y-2 border-solid rounded-3xl z-50 h-[60%]",
            className
          )
        }>
        <Box
          className='flex flex-col gap-9 py-6 ml-2.5 my-5 bg-primary-900 rounded-2xl w-[35%] wide-screen:w-[50%] items-center'
        >
          { children }
        </Box>
      </Box>
      <Box 
        className='
          fixed
          top-10 
          left-20 
          w-[50px] 
          mt-12 
          rounded-e-full
          pl-8
          flex
          flex-col
          gap-8
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
                    'flex h-14',
                  )
                }
              >
                <Typography 
                  className={
                    tailwindUtil('text-primary-700 transition-all', activeItem?.index === childIdx && 'text-primary-400')
                  }
                >
                  {label}
                </Typography>
              </Box>
            )
          })
        }
      </Box>
    </Box>
  );
}

export default React.memo(Navigation);
