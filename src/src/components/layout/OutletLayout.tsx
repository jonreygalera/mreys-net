import React, { PropsWithChildren } from 'react';
import Box from '../box/Box';
import Typography from '../typography/Typography';

const OutletLayout: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <Box
      className="h-full w-full"
    >
      <Box className='ml-72 mr-32 hidden laptop:block'>
        { children }
      </Box>
      <Box className='ml-32 mr-10 laptop:hidden flex items-center '>
        <Typography variant='h1'>Lower screen size | Ongoing</Typography>
      </Box>
    </Box>
  );
}

export default OutletLayout;
