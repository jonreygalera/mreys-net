import React from 'react';
import Box from '../../components/box/Box';
import PhotoCardGroup from '../../components/photoCard/PhotoCardGroup';
import PhotoCard from '../../components/photoCard/PhotoCard';
import Typography from '../../components/typography/Typography';
import Button from '../../components/button/Button';
import ButtonGroup from '../../components/button/ButtonGroup';
import { tailwindUtil } from '../../utils/tailwindUtil';
import IImageSet from '../../interface/IImageSet';
import {
  StarIcon as StarIconOutline,
  BookOpenIcon as BookOpenIconOutline,
  ArrowUpRightIcon,
} from '@heroicons/react/24/outline';
import {
  StarIcon as StarIconSolid,
} from '@heroicons/react/24/solid';

import IProjectCardContainerProps from '../../interface/IProjectCardContainerProps';

const ProjectCardContainer: React.FC<IProjectCardContainerProps> = ({
  data = {},
  isBookmark = false,
  onClickAction,
}) => {


  return (
    <Box
      className={tailwindUtil(
        'border-2 flex flex-col max-w-xl laptop:mt-10 laptop:ml-10 h-[400px] laptop:h-[170px] relative rounded-3xl border-primary-950 py-2 px-2 transition duration-500 gap-5 hover:-translate-y-2 shadow-solid bg-primary-100',
      )}
    >
      {/* Content box */}
      <Box className="h-full w-full flex flex-col bg-primary-50 rounded-2xl shadow-primary-950 transition-all border-2 border-primary-950">
        {/* Image group */}
        <PhotoCardGroup className="static laptop:absolute laptop:-top-5 laptop:-left-10 ml-16 laptop:m-2">
          {data.imageSets?.slice(0, 3).map((image: IImageSet, idx: number) => (
            <PhotoCard key={`project-photo-${idx}`} src={image.source || ''} />
          ))}
        </PhotoCardGroup>
        {/* Main content */}
        <Box className="flex border-t-2 border-t-primary-950 laptop:border-none bg-primary-300 laptop:bg-transparent">
          <Box className="laptop:ml-48 flex flex-col w-full gap-5 ">
            {/* Title */}
            <Box>
              <Typography variant="h2">{data?.title || ''}</Typography>
            </Box>
            {/* Action buttons */}
            <Box className="flex gap-1 ">
              <ButtonGroup>
                <Button
                  className='bg-blue-300 hover:bg-blue-400'
                  startComponent={<ArrowUpRightIcon className="size-3 mx-1 items-center" />}
                  onClick={() => onClickAction?.('visit', data)}
                >
                  Visit
                </Button>
                <Button
                  className='bg-amber-100 hover:bg-amber-300'
                  startComponent={isBookmark ? <StarIconSolid className="size-3 mx-1 items-center text-yellow-400" /> : <StarIconOutline className="size-3 mx-1 items-center" />}
                  onClick={() => onClickAction?.('star', data)}
                >
                  Star
                </Button>
                <Button
                  className='bg-lime-100 hover:bg-lime-200'
                  startComponent={<BookOpenIconOutline className="size-3 mx-1 items-center" />}
                  onClick={() => onClickAction?.('open', data)}
                >
                  Open
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(ProjectCardContainer);
