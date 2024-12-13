import React, { useState } from 'react';
import Box from '../../components/box/Box';
import Carousel from '../../components/carousel/Carousel';
import IImageSet from '../../interface/IImageSet';
import PileBox from '../../components/box/PileBox';

interface Props {
  imageSets: IImageSet[],
  value?: IImageSet | null
}

const DRAWBACK_SELECTED_PROJECT_IMAGE : IImageSet = {
  id: 0,
  source: "https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg",
};

const CarouselImageSelection: React.FC<Props> = (props) => {
  const { imageSets, value } = props;
  const [ selectedProjectImage, setSelectedProjectImage ] = useState<IImageSet | null >(value ?? DRAWBACK_SELECTED_PROJECT_IMAGE);

  return (
    <Box className='flex flex-col w-full gap-2 '>
      <PileBox>
        <img 
          src={selectedProjectImage?.source}
          className='
            w-full
            h-full
            shadow-2xl 
            shadow-primary-700
            rounded-3xl 
            rotate-3
            scale-90
            hover:rotate-0
            hover:scale-100
            transition
            duration-700
            cursor-pointer
            transform-gpu
            delay-700
          '
        />
      </PileBox>
      <Carousel
        onItemSelected={(child) => {
          const propsChild : any = React.isValidElement(child) ? (child?.props ?? null) : null;
          const dataImage: any = imageSets?.find(imgSet => imgSet.id === propsChild['data-content']['id']);
          setSelectedProjectImage(dataImage)
        }}
        CarouselContainerProps={{
          className: 'flex mr-1'
        }}
      >
        {
          imageSets.map((data, idx) => {
            return (
              <img 
                key={`carousel-image-selection-${idx}`}
                src={data?.source} 
                className='w-44 h-36' 
                data-content={data}
              />
            )
          })
        }
      </Carousel>
    </Box>
  );
}

export default CarouselImageSelection;
