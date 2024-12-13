import { Outlet } from 'react-router-dom';
import Box from './components/box/Box';
import Navigator from './features/navigator/Navigator';
import OutletLayout from './components/layout/OutletLayout';
import Typography from './components/typography/Typography';
import ScrollIndicator from './components/scrollIndicator/ScrollIndicator';
import { useState } from 'react';
import INavigationItem from './interface/INavigationItem';
import { tailwindUtil } from './utils/tailwindUtil';

const Base = () => {
  const [selectedNavItem, setSelectedNavItem] = useState<INavigationItem | null>(null);
  return (
    <Box
      className='flex flex-col'
    >
      <ScrollIndicator/>
     {
      selectedNavItem && (
        <Box
          className='fixed top-0 left-0 z-50 h-full w-full flex flex-col bg-primary-800 transition-all animate-fade-in '
          style={{ zIndex: 60 }}
        >
          <Box
            className='relative w-full h-1/2 bg-primary-50 overflow-hidden'
          >
          <Typography 
            className={tailwindUtil(
              'absolute text-[500px] top-5 font-extrabold px-52 animate-letter-spacing-compress transition-all text-primary-800'
              )}
            >{selectedNavItem?.label ?? 'Home'}</Typography>
            </Box>
          <Box
            className='relative w-full h-1/2 bg-primary-800 overflow-hidden'
          >
          <Typography 
            className={tailwindUtil(
              'absolute text-[500px] -top-[439px] font-extrabold px-52 animate-letter-spacing-compress transition-all text-primary-50'
            )}
          >{selectedNavItem?.label ?? 'Home'}</Typography>
          </Box>
        </Box>
      )
     }
      <Box className='flex'>
        <Navigator 
          onMouseEnter={(navItem) => setSelectedNavItem(navItem)}
          onMouseLeave={() => setSelectedNavItem(null)}
        />
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
