import React, { Children, PropsWithChildren, useEffect, useState } from 'react';
import Box from '../box/Box';
import Button from '../button/Button';
import { tailwindUtil } from '../../utils/tailwindUtil';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface Props extends PropsWithChildren {
  title?: string;
  timeInterval?: number;
}

const HighlightCarousel: React.FC<Props> = ({ children, timeInterval = 10 }) => {
  const items = Children.toArray(children);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [startInterval, setStartInterval] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };
  
  useEffect(() => {
    let interval = null;
    if(startInterval) {
      interval = setInterval(nextSlide, timeInterval * 1000);
    }
    return () => {
      if(startInterval && interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex, startInterval, timeInterval]);

  return (
    <Box
      className='relative h-[350px] laptop:min-h-full laptop:h-[600px] bg-primary-50 border-2 border-primary-900 rounded-3xl shadow-solid'
      onMouseEnter={() => setStartInterval(false)}
      onMouseLeave={() => setStartInterval(true)}
    >

      {/* <Box className='absolute w-full border-primary-950 border-t-2 z-50'>
        <Box className='flex justify-center w-full'>
          <Box className='flex justify-center items-center bg-primary-800 w-48 h-14 rounded-b-3xl'>
            <Typography className='text-primary-50 underline'>{title}</Typography>
          </Box>
        </Box>
      </Box> */}

      <Box
        className='relative flex overflow-hidden min-h-full min-w-full'
      >
        {
          items.map((child, idx) => {
            return (
              <Box
                className={
                  tailwindUtil('absolute inset-0 flex min-w-full h-full flex-shrink-0 transition-all duration-1000',
                    (idx == currentIndex) ? 'translate-x-0' : 'translate-x-full'
                  )
                }
              >
                { child }
              </Box>
            ) 
          })
        }
      </Box>
      {/* Indicators */}
      <Box
        className='absolute hidden laptop:flex top-[568px] justify-center items-center mt-4 ml-4'
      >
        {
          items.map((_, idx) => {
            return (
              <button
                onClick={() => setCurrentIndex(idx)}
                className={tailwindUtil(
                  'rounded-full mx-1',
                  idx === currentIndex ? 'bg-primary-500 w-3 h-3' : 'bg-primary-400 w-2 h-2'
                )}
              >
              </button>
            ) 
          })
        }
      </Box>
      <Button 
        onClick={prevSlide}
        className='absolute flex items-center bg-primary-900 opacity-80 hover:opacity-100 text-primary-50 rounded-full h-[50px] w-[50px] top-[44%] laptop:top-64 border-2 border-primary-500 shadow-solid mx-2'
      >
        <ChevronLeftIcon className='size-4 laptop:size-7'/>
      </Button>
      <Button 
        onClick={nextSlide}
        className='absolute flex items-center bg-primary-900 opacity-80 hover:opacity-100 text-primary-50 rounded-full h-[50px] w-[50px] top-[44%] right-0 laptop:top-64 border-2 border-primary-500 shadow-solid mx-2'
      >
        <ChevronRightIcon className='size-4 laptop:size-7'/>
      </Button>
    </Box>
  );
};

export default React.memo(HighlightCarousel);
