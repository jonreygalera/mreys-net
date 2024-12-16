import React from 'react';
import Box from '../../components/box/Box';
import Typography from '../../components/typography/Typography';
import Button from '../../components/button/Button';
import Slide from '../../components/slide/Slide';
import ButtonGroup from '../../components/button/ButtonGroup';
import PileBox from '../../components/box/PileBox';
import IPreviewProjectPanelProps from '../../interface/IPreviewProjectPanelProps';


const PreviewProjectPanel: React.FC<IPreviewProjectPanelProps> = (props) => {
  const {
    data,
    onAction,
  } = props;

  return (
    <Box 
      className='
        w-full
        relative 
        overflow-hidden
        rounded-3xl
      '
    >
      <Box className='flex flex-col-reverse laptop:grid laptop:grid-cols-2 h-full w-full'>
        <Box className='flex flex-col laptop:p-20 laptop:pt-20 laptop:gap-5 border-t-2 border-t-primary-950 laptop:border-none bg-primary-300 laptop:bg-transparent h-[139px]'>

          <Box className='flex w-full flex-col laptop:gap-5 laptop:min-h-[270px] laptop:max-h-[270px] p-1 laptop:ml-2'>
            <Box className='relative laptop:pt-5'>
            <Box className='hidden laptop:block'>
                <Typography variant={'title'}>
                  {data?.title ?? 'Title'}
                </Typography>
              </Box>
              <Box className='laptop:hidden'>
                <Typography variant={'h3'}>
                  {data?.title ?? 'Title'}
                </Typography>
              </Box>
            </Box>
            <Box className='max-w-full h-10  relative'>
              <Typography variant='body1' className='text-ellipsis overflow-hidden' style={{ textWrap: 'nowrap'}}>
                { data?.description ?? ''}
              </Typography>
            </Box>
            <Box className='hidden laptop:block'>
              Roles
            </Box>
            <Button 
              className='w-full border-2 rounded-2xl border-primary-950 laptop:hidden shadow-solid bg-green-400'
              onClick={() => onAction?.('open', data)}>View</Button>
          </Box>
            
          <hr className='hidden laptop:block mr-24 border-primary-300'/>

          <Box className='laptop:flex hidden w-full h-full relative px-5'>
            <Box className='laptop:flex hidden w-full h-full relative flex-col gap-2'>
              <ButtonGroup>
              {
                  data?.joinData?.map((tech: any, idx) => (
                    <Button
                      key={`button-group-tech-stack-${idx}`}
                      onClick={() => console.log('test')}
                      startComponent={<svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                        </svg>
                      }
                    >
                      {tech?.label ?? ''}
                    </Button>
                  ))
                }
              </ButtonGroup> 
            </Box>

            <Box className='absolute hidden laptop:flex items-center gap-2 bottom-0 right-0'>
              <Slide
                className='w-[250px]'
                label={'Slide to Visit'}
                labelSlided={'Visited!'}
                onSlided={() => onAction?.('visit', data)}
              />
            </Box>
          </Box>  

        </Box>

        <Box className='laptop:mt-4 laptop:h-full bg-primary-50 laptop:bg-transparent'>
          <PileBox>
            <img 
              src={data?.imageSets ? (data.imageSets[0])?.source ?? '' : ''}
              className='
                w-full
                h-[200px]
                laptop:min-h-[500px]
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
        </Box>
      </Box>
    </Box>
  );
}

export default React.memo(PreviewProjectPanel);
