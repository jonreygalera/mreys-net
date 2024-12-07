import React from 'react';
import Box from '../../components/box/Box';
import Typography from '../../components/typography/Typography';
import Button from '../../components/button/Button';
import Slide from '../../components/slide/Slide';
import CarouselImageSelection from '../carouselImageSelection/CarouselImageSelection';
import IProject from '../../interface/IProject';
import ButtonGroup from '../../components/button/ButtonGroup';

interface Props {
  data?: IProject | null;
  title?: string;
}

const PreviewProjectPanel: React.FC<Props> = (props) => {
  const {
    data,
  } = props;

  return (
    <Box 
      className='
        w-full
        relative 
        h-[600px]
        overflow-hidden 
        rounded-3xl
      '
    >
      <Box className='grid grid-cols-2 h-full w-full'>
        <Box className='flex flex-col p-10 pt-20 gap-5'>
          
          <Box className='flex w-full flex-col gap-5 min-h-[270px] max-h-[270px] ml-2'>
            <Box className='relative pt-5'>
              <Typography variant='title'>
                {data?.title ?? 'Title'}
              </Typography>
            </Box>
            <Box className='max-w-full h-20 overflow-hidden relative'>
              <Typography variant='body1' className='text-ellipsis'>
                { data?.description ?? ''}
              </Typography>
            </Box>
          </Box>
            
          <hr className='mr-24 border-primary-300'/>

          <Box className='flex w-full h-full relative px-5'>
            <Box className='flex w-full h-full relative flex-col gap-2'>
              <ButtonGroup>
              {
                  ([...Array(10)]).map((_, idx) => (
                    <Button
                      key={`button-group-tech-stack-${idx}`}
                      onClick={() => console.log('test')}
                      startComponent={<svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                        </svg>
                      }
                    >
                      Laravel
                    </Button>
                  ))
                }
              </ButtonGroup> 
            </Box>

            <Box className='absolute flex items-center gap-2 bottom-0 right-0'>
              <Slide
                className='w-[250px]'
                label={'Slide to Visit'}
                labelSlided={'Visited!'}
                onSlided={() => alert('Jon Rey Galera | Ongoing')}
              />
            </Box>
          </Box>  

        </Box>

        <Box className='mt-4'>
          <CarouselImageSelection
            imageSets={data?.imageSets ?? []}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default React.memo(PreviewProjectPanel);
