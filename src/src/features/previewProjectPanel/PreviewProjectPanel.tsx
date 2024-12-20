import React from 'react';
import Box from '../../components/box/Box';
import Typography from '../../components/typography/Typography';
import Button from '../../components/button/Button';
import PileBox from '../../components/box/PileBox';
import IPreviewProjectPanelProps from '../../interface/IPreviewProjectPanelProps';
import Chip from '../../components/chip/Chip';
import ITechStack from '../../interface/ITechStack';
import { openUrl } from '../../utils/urlUtil';


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
            <Box className='hidden laptop:flex flex-col'>
              Roles:
              <Box className='flex'>
                {
                  data?.roles?.map((role) => (
                    <Typography>{role}</Typography>
                  ))
                }
              </Box>
            </Box>
            <Button 
              className='w-full border-2 rounded-2xl border-primary-950 laptop:hidden shadow-solid bg-green-400'
              onClick={() => onAction?.('open', data)}>View</Button>
          </Box>
            
          <hr className='hidden laptop:block mr-24 border-primary-300'/>

          <Box className='laptop:flex hidden w-full h-[2250px] relative px-5 flex-col'>
            Collaborative Tools: 
            <Box className='laptop:grid laptop:grid-cols-4 laptop:gap-2 hidden w-full h-full gap-3'>
              {
                data?.joinData?.map((tech: ITechStack, idx) => (
                  <Chip
                    key={`button-group-tech-stack-${idx}`}
                    onClick={() => openUrl(tech.url)}
                  >
                    { tech?.icon && React.createElement(tech.icon, { className: 'h-5 w-5'})}
                    {(tech?.label ?? '')}
                  </Chip>
                ))
              }
            </Box>

            {/* <Box className=' hidden laptop:flex items-center gap-2 bottom-0 right-0 bg-red-500'>
              <Slide
                className='w-[250px]'
                label={'Slide to Visit'}
                labelSlided={'Visited!'}
                onSlided={() => onAction?.('visit', data)}
              />
            </Box> */}
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
