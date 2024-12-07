import React, { useState, useMemo } from 'react';
import Box from '../box/Box';
import ICarouselProps from '../../interface/ICarouselProps';
import Button from '../button/Button';
import { tailwindUtil } from '../../utils/tailwindUtil';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const Carousel: React.FC<ICarouselProps> = (props) => {
  const { 
    children, 
    CarouselContainerProps,
    onItemSelected 
  } = props;
  const [ childrenArray, setChildrenArray ] = useState<any[]>(React.Children.toArray(children));

  const memoizeChildren = useMemo(() => {
    return childrenArray;
  }, [childrenArray]);

  const handleOnSelected = (index: number, child: any) => {
    const cloneChildrenArray = [...childrenArray];
    onItemSelected?.(child, index);
    const childrenContainer = [...cloneChildrenArray.slice(index), ...cloneChildrenArray.splice(0, index)];
    setChildrenArray(childrenContainer);
  }

  const handleForward = () => {
    const cloneChildrenArray = [...childrenArray];
    handleOnSelected(1, cloneChildrenArray[1]);
  };

  const handleBackward = () => {
    const cloneChildrenArray = [...childrenArray];
    handleOnSelected(cloneChildrenArray.length - 1, cloneChildrenArray[cloneChildrenArray.length - 1]);
  };

  return (
    <Box className="flex" {...CarouselContainerProps}>
      <Button 
        className="flex h-36 border hover:border-primary-500 border-primary-300 rounded-s-2xl relative"
        onClick={handleForward}
      >
        <ChevronLeftIcon className='size-3'/>
      </Button>

      <Box className="fex w-full overflow-hidden">
        <Box className="flex">
          {
            memoizeChildren?.map((child, index) => {
            const propsChild : any = React.isValidElement(child) ? (child?.props ?? null) : null;

            return ((
              React.cloneElement(child, { 
                ...propsChild, 
                onClick: !('onClick' in propsChild) && (() => handleOnSelected(index, child)),
                className: tailwindUtil(
                  propsChild?.className ?? '', 
                  'cursor-pointer',
                  index != 0 && "opacity-50 scale-75 hover:shadow-md hover:shadow-primary-700 blur-sm hover:blur-none grayscale hover:grayscale-0",
                  index == 0 && "",
                  (index != 0) && (index % 2 == 0 ? "hover:skew-y-6" : "hover:-skew-y-6"),
                  "hover:opacity-100  transition-all duration-1000",
                ),
              })
            ))
            })
          }
        </Box>
      </Box>

      <Button 
        className="flex h-36 border hover:border-primary-500 border-primary-300 rounded-e-2xl relative"
        onClick={handleBackward}
      >
        <ChevronRightIcon className='size-3'/>
      </Button>
    </Box>
  );
};

export default Carousel;
