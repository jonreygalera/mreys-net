import { Outlet } from 'react-router-dom';
import Box from './components/box/Box';
import Navigator from './features/navigator/Navigator';
import OutletLayout from './components/layout/OutletLayout';
import Typography from './components/typography/Typography';
import ScrollIndicator from './components/scrollIndicator/ScrollIndicator';
import { useState } from 'react';
import INavigationItem from './interface/INavigationItem';
import { tailwindUtil } from './utils/tailwindUtil';
import BubbleChat from './features/bubbleChat/BubbleChat';

const Base = () => {
  const [selectedNavItem, setSelectedNavItem] = useState<INavigationItem | null>(null);
  const [scrollYValue, setScrollYValue ] = useState<number>(0);

  return (
    <Box
      className='flex flex-col'
    >
      <Box className={
          tailwindUtil('laptop:hidden flex border-2 justify-center border-primary-950 sticky inset-0 z-50 p-2 animate-fade-in shadow-solid bg-primary-100 rounded-b-md')
        }
      >
        <Typography variant='h1' className='tracking-[0.9em]'>MReY</Typography>
      </Box>
      <ScrollIndicator onScrollY={(value) => setScrollYValue(value)}/>
     {
      selectedNavItem && (
        <Box
          className='fixed top-0 left-0 z-50 h-full w-full hidden laptop:flex flex-col bg-primary-800 transition-all animate-fade-in'
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
        <Box className={
          tailwindUtil('absolute top-36 hidden rotate-12 left-[650px] wide-screen:left-[900px] translate-all delay-200', scrollYValue >= 100 ? 'opacity-100' : ' opacity-0')
        }>
          <BubbleChat/>
        </Box>
        <Box
          className='bg-primary-800 h-[400px] laptop:mt-32 flex justify-center items-center border-t-8 border-primary-950'
        >
          <Box className='flex flex-col items-center justify-center'>
            <Box className='rounded-full border-8 border-primary-950 overflow-hidden '>
              <img src="https://avatars.githubusercontent.com/u/55083108?v=4" className='w-[100px] h-[100px] hover:animate-spin'/>
            </Box>
            <Typography variant='h4' className='text-primary-400'>
              @ { (new Date()).getFullYear() } Jon Rey Galera 
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Base;
