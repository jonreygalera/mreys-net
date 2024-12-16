import React, { PropsWithChildren } from 'react';
import Box from './Box';

interface Props extends PropsWithChildren {

}

const PileBox: React.FC<Props> = (props) => {
  const { children } = props;
  return (
    <Box className='
          flex
          rounded-3xl
          relative
          justify-center
          laptop:mb-2
        '
      >
       <Box 
        className='
            relative  
            w-2/3 
            h-full
            overflow-hidden
            rounded-3xl 
            rotate-3
            scale-90
            hover:rotate-0
            hover:scale-100
            transition
            duration-700
            transform-gpu
            border-2
            border-primary-950
            shadow-2xl
          '
        >
          <Box className='
              w-full 
              h-full
              overflow-hidden
              rounded-3xl 
              shadow-2xl 
              shadow-primary-700
              rotate-3
              scale-90
              hover:rotate-0
              hover:scale-100
              transition
              duration-700
              delay-300
              transform-gpu
              border-2
              border-primary-950
            '>
              { children }
            </Box>
       </Box>
       </Box>
  );
}

export default PileBox;
