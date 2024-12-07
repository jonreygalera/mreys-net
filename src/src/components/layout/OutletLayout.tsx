import React, { PropsWithChildren } from 'react';
import Box from '../box/Box';
import Typography from '../typography/Typography';

const OutletLayout: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <Box
      className="h-screen"
    >
      <Box
        className='bg-primary-950 text-yellow-400 sticky top-0 z-50 px-5'
      >
        # ONGOING
      </Box>
      <Box className='ml-32 mr-10 hidden laptop:block'>
        { children }
      </Box>
      <Box className='ml-32 mr-10 laptop:hidden flex items-center '>
        <Typography variant='h1'>Lower screen size | Ongoing</Typography>
      </Box>
      <Box
        className='relative border border-transparent mt-42 h-[400px]'
      >
        <Box
          className='bg-primary-900 h-[400px] mt-32 flex justify-center items-center'
        >
          <Box className='flex flex-col items-center justify-center'>
            <img src="https://avatars.githubusercontent.com/u/55083108?v=4" className='w-[100px] h-[100px] rounded-full'/>
            <Typography variant='h4' className='text-primary-400'>
              @ { (new Date()).getFullYear()} Jon Rey Galera
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default OutletLayout;
