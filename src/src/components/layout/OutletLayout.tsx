import React, { PropsWithChildren } from 'react';
import Box from '../box/Box';

const OutletLayout: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <Box
      className="laptop:h-full laptop:w-full"
    >
      <Box className='m-2 laptop:ml-72 laptop:mr-32'>
        { children }
      </Box>
    </Box>
  );
}

export default OutletLayout;
