import React, { Children } from 'react';
import Box from '../box/Box';
import INavigationProps from '../../interface/INavigationProps';
import { tailwindUtil } from '../../utils/tailwindUtil';
import Typography from '../typography/Typography';

const Navigation: React.FC<INavigationProps> = (props) => {
  const { children, className, activeItem } = props;
  
  return (
    <Box
      className='fixed w-screen laptop:pt-32 bottom-0 laptop:pr-5 laptop:-top-20 laptop:h-full laptop:w-[15%] wide-screen:w-[10%] z-[999] bg-primary-800 laptop:bg-transparent'
    >
      <Box 
        className={
          tailwindUtil(
            "bg-primary-800 border-primary-950 border-t-2 laptop:border-2 laptop:border-solid laptop:rounded-3xl z-50 laptop:h-[63%] laptop:shadow-solid py-2 laptop:p-0",
            className
          )
        }>
        <Box
          className='flex laptop:flex-col justify-around w-full laptop: laptop:items-center laptop:gap-9 laptop:py-6 laptop:ml-2.5 laptop:my-5 bg-transparent laptop:bg-primary-900 rounded-2xl laptop:w-[35%] wide-screen:w-[50%] laptop:border-2 border-primary-700'
        >
          { children }
        </Box>
      </Box>
      <Box 
        className='
          hidden
          fixed
          top-10 
          left-20 
          w-[50px] 
          mt-12 
          rounded-e-full
          pl-8
          laptop:flex
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
                    tailwindUtil(
                      'text-primary-700 transition-all relative', 
                      activeItem?.index === childIdx && 'text-primary-400',
                      activeItem?.index === childIdx && 'after:animate-ping after:absolute after:top-3 after:-right-3 after:rounded-full after:inline-block after:w-1 after:h-1 after:bg-green-700 after:shadow-3xl after:shadow-green-500'
                    )
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
