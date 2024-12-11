import { Outlet } from 'react-router-dom';
import Box from './components/box/Box';
import Navigator from './features/navigator/Navigator';
import OutletLayout from './components/layout/OutletLayout';
import Typography from './components/typography/Typography';
import ScrollIndicator from './components/scrollIndicator/ScrollIndicator';

const Base = () => {
  return (
    <Box
      className='flex flex-col'
    >
      <ScrollIndicator/>
      {/* <Box
        className='bg-primary-950 text-yellow-400 top-0 z-50 px-5 sticky w-full'
      >
        # ONGOING
      </Box> */}
      <Box className='flex'>
        <Navigator/>
        <OutletLayout>
          <Outlet/>
        </OutletLayout>
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

export default Base;
