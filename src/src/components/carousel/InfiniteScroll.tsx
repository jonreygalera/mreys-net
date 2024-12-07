import React, { memo } from 'react';
import IInfiniteScrollProps from '../../interface/IInfiniteScrollProps';
import Box from '../box/Box';
import { tailwindUtil } from '../../utils/tailwindUtil';

const InfiniteScroll: React.FC<IInfiniteScrollProps> = ({ className, children, orientation = 'horizontal' }) => {
  const scrollAnimationClass = orientation === 'vertical' 
    ? 'animate-infinite-scroll-v' 
    : 'animate-infinite-scroll-h';

  const childArray = React.Children.toArray(children);
  const clonedChildren = [...childArray];

  return (
    <Box className={
      tailwindUtil("w-full inline-flex flex-nowrap", className)
    }>
      {
        [...Array(4)].map((_, idx) => (
          <ul key={idx} className={tailwindUtil('flex items-center justify-center md:justify-start [&_li]:mx-8', scrollAnimationClass)}>
            {clonedChildren.map((child, index) => (
              <li key={index}>{child}</li>
            ))}
          </ul>
        ))
      }
      
    </Box>
  );
};

export default memo(InfiniteScroll);
