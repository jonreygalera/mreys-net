import React, { Children, PropsWithChildren, useEffect, useState } from 'react';
import Box from '../box/Box';
import Button from '../button/Button';
import { tailwindUtil } from '../../utils/tailwindUtil';
import Typography from '../typography/Typography';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface Props extends PropsWithChildren {
  title?: string;
  timeInterval?: number;
}

const HighlightCarousel: React.FC<Props> = ({ children, title, timeInterval = 10 }) => {
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
      className='relative min-h-full h-[600px] shadow-md rounded-3xl shadow-primary-400'
      onMouseEnter={() => setStartInterval(false)}
      onMouseLeave={() => setStartInterval(true)}
    >

      <Box className='absolute w-full rounded-3xl border-primary-950 border-t-2 z-50'>
        <Box className='flex justify-center w-full'>
          <Box className='flex justify-center items-center bg-primary-950 w-48 h-14 rounded-b-3xl'>
            <Typography className='text-primary-50 underline'>{title}</Typography>
          </Box>
        </Box>
      </Box>

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
        className='absolute flex top-[568px] justify-center mt-4 ml-4'
      >
        {
          items.map((_, idx) => {
            return (
              <button
                onClick={() => setCurrentIndex(idx)}
                className={tailwindUtil(
                  'rounded-full mx-1 w-3 h-3',
                  idx === currentIndex ? 'bg-primary-300' : 'bg-primary-400'
                )}
              >
              </button>
            ) 
          })
        }
      </Box>
      <Button 
        onClick={prevSlide}
        className='absolute flex items-center bg-primary-900 text-primary-50 rounded-e-3xl h-[100px] top-64 hover:bg-primary-950'
      >
        <ChevronLeftIcon className='size-3'/>
      </Button>
      <Button 
        onClick={nextSlide}
        className='absolute flex items-center bg-primary-900 text-primary-50 rounded-s-3xl h-[100px] top-64 right-0 hover:bg-primary-950'
      >
        <ChevronRightIcon className='size-3'/>
      </Button>
    </Box>
  );
};

export default React.memo(HighlightCarousel);
