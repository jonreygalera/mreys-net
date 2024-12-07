import React, { Children, PropsWithChildren } from 'react';
import Box from '../box/Box';
import { tailwindUtil } from '../../utils/tailwindUtil';

interface Props extends PropsWithChildren {
  className?: string; 
  
}

const PhotoCardGroup: React.FC<Props> = (props) => {
  const { children, className } = props;
  const countChildren = Children.count(children);

  const middleIndex = Math.floor(countChildren / 2);

  return (
    <Box 
      className={tailwindUtil('relative pt-1',
        className,
        `
          h-44 w-56 
          rounded-3xl 
          items-center 
          justify-center
      `)}
    >
      {
        Children?.map(children, (child, childIdx) => {
          let classRotate = "";

          if(childIdx < middleIndex && countChildren > 1) {
            classRotate = "-rotate-12 translate-y-8 hover:-translate-y-0";
          } else if(childIdx > middleIndex && countChildren > 1) {
            classRotate = "rotate-12 translate-x-32 translate-y-2 hover:-translate-y-5";
          } else {
            classRotate = "rotate-0 translate-x-16 z-10 hover:-translate-y-4";
          }
          
          return (
            <Box 
              className={tailwindUtil("absolute duration-500", classRotate)}
            >
              { child }
            </Box>
          )
        })
      }
    </Box>
  )
}

export default PhotoCardGroup;
