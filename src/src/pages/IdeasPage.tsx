import React, {  useState } from 'react';
import Box from '../components/box/Box';
import ProjectCardContainer from '../features/projectCardContainer/ProjectCardContainer';
import Typography from '../components/typography/Typography';
import { useProjectModelHook } from '../hooks/useProjectModelHook';
import IProject from '../interface/IProject';
import PreviewProjectPanel from '../features/previewProjectPanel/PreviewProjectPanel';
import HighlightCarousel from '../components/carousel/HighlightCarousel';
import Dialog from '../components/dialog/Dialog';
import { useProjectExperimentalModelHook } from '../hooks/useProjectExperimentalModelHook';

interface Props {

}

const IdeasPage: React.FC<Props> = () => {

  const { data: dataProjectModel } = useProjectModelHook({ key: 'all', value: 'all'})
  const { data: dataProjectExperimentalModel } = useProjectExperimentalModelHook({ key: 'all', value: 'all'})

  const [ selectedProject, setSelectedProject ] = useState<IProject | null>(null);


  return (
    <Box className='relative mt-5'>
      <HighlightCarousel title='Ideas'>
        {
          dataProjectModel?.map((data: IProject) => {
            return (
             <Box
              className='w-full relative'
             >
               <PreviewProjectPanel 
                title='Ideas'
                data={data}
              />
             </Box>
            )
          })
        }
      </HighlightCarousel>
      <Box className='flex mt-2 mb-10 border rounded-lg h-[800px]'>
        <Box className='flex p-5 bg-primary-950 rounded-s-lg relative'>
          <Typography variant='h1' className='text-primary-300'>Projects</Typography>
        </Box>
        <Box className='w-11/12 pb-5'>
          <Box className='grid grid-cols-2 gap-2 pl-20 h-full overflow-y-auto'>
            {
              dataProjectModel?.map((data: IProject) => {
                return (
                  <ProjectCardContainer 
                    key={`project-container-${data?.key}`}
                    active={data?.key === selectedProject?.key}
                    data={data}
                    onClickView={() => {
                      setSelectedProject(data)
                    }}
                  />
                )
              })
            }
          </Box>
        </Box>
      </Box>

      <Box className='p-5  bg-primary-950'>
        <Typography variant='h1' className='text-primary-300'>Experimental</Typography>
      </Box>
      <Box className='pb-5'>
        <Box className='grid grid-cols-2 pb-10 gap-2 pl-20 h-[800px] overflow-y-auto border rounded-s-lg'>
          {
            dataProjectExperimentalModel?.map((data: IProject) => {
              return (
                <ProjectCardContainer 
                  key={`project-container-${data?.key}`}
                  active={data?.key === selectedProject?.key}
                  data={data}
                  onClickView={() => {
                    setSelectedProject(data)
                  }}
                />
              )
            })
          }
        </Box>
      </Box>
      {/* Dialog */}
      <Dialog 
        isOpen={Boolean(selectedProject)} 
        title={' '}
        onClose={() => setSelectedProject(null)}
      >
        <Box>
          <PreviewProjectPanel 
            data={selectedProject}
          />
        </Box>
      </Dialog>
    </Box>
  );
}

export default IdeasPage;
