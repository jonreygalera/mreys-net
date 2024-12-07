import React from 'react';
import Box from '../../components/box/Box';
import PhotoCardGroup from '../../components/photoCard/PhotoCardGroup';
import PhotoCard from '../../components/photoCard/PhotoCard';
import Typography from '../../components/typography/Typography';
import Button from '../../components/button/Button';
import ButtonGroup from '../../components/button/ButtonGroup';
import backgroundImage from '../../assets/iconSvg/bg-hexagon.svg';
import { tailwindUtil } from '../../utils/tailwindUtil';
import IImageSet from '../../interface/IImageSet';
import {
  StarIcon as StarIconOutline,
  BookOpenIcon as BookOpenIconOutline,
  ArrowUpRightIcon,
} from '@heroicons/react/24/outline';

interface Props {
  data?: Record<string, any>;
  active?: boolean;
  onClickView?: () => void;
}

const ProjectCardContainer: React.FC<Props> = ({
  data = {},
  active = false,
  onClickView,
}) => {

  const handleOnVisitUrl = () => {

  }

  return (
    <Box
      className={tailwindUtil(
        'border-2 flex flex-col max-w-xl mt-10 ml-10 w-full h-[170px] relative rounded-3xl py-2 px-2 transition duration-500 gap-5 hover:-translate-y-2',
      )}
      style={{
        backgroundImage: active ? `url(${backgroundImage})` : '',
      }}
    >
      {/* Content box */}
      <Box className="h-full w-full bg-primary-50 hover:bg-primary-75 hover:border-primary-400 rounded-2xl shadow-primary-950 glassmorphic">
        {/* Image group */}
        <PhotoCardGroup className="absolute -top-5 -left-10">
          {data.imageSets?.slice(0, 3).map((image: IImageSet, idx: number) => (
            <PhotoCard key={`project-photo-${idx}`} src={image.source || ''} />
          ))}
        </PhotoCardGroup>
        {/* Main content */}
        <Box className="flex">
          <Box className="ml-48 flex flex-col w-full gap-5">
            {/* Title */}
            <Box>
              <Typography variant="h2">{data?.title || ''}</Typography>
            </Box>
            {/* Action buttons */}
            <Box className="flex gap-1">
              <ButtonGroup>
                <Button
                  startComponent={<ArrowUpRightIcon className="size-3 mx-1 items-center" />}
                  onClick={handleOnVisitUrl}
                >
                  Visit
                </Button>
                <Button
                  startComponent={<StarIconOutline className="size-3 mx-1 items-center" />}
                  onClick={() => console.log('Bookmark')}
                >
                  Bookmark
                </Button>
                <Button
                  startComponent={<BookOpenIconOutline className="size-3 mx-1 items-center" />}
                  onClick={onClickView}
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

export default ProjectCardContainer;
