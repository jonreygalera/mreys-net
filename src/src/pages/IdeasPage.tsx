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
import { actionType } from '../types/TAction';
import { openUrl } from '../utils/urlUtil';
import useLocalStorage from '../hooks/useLocalStorage';
import NoProjectLink from '../features/notFound/NoProjectLink';

interface ISelectedProject {
  action: actionType,
  data: IProject | null
}

const IdeasPage: React.FC = () => {

  const { data: dataProjectModel } = useProjectModelHook({ key: 'all', value: 'all'})
  const { data: dataProjectExperimentalModel } = useProjectExperimentalModelHook({ key: 'all', value: 'all'})

  const [ selectedProject, setSelectedProject ] = useState<ISelectedProject | null>(null);
  const [ bookmarkProject , setBookmarkProject ] = useLocalStorage<string[]>('bookmark-project', []);

  const handleOnProjectAction = (actionType: actionType, dataValue: IProject | null) => {
    if(dataValue?.url &&  actionType === 'visit') {
      openUrl(dataValue.url);
      setSelectedProject(null);
    } else {
      if(actionType == 'star') {
        const cloneBookmarkProject = bookmarkProject;
        if(cloneBookmarkProject.includes(dataValue?.key as string)) {
          setBookmarkProject(cloneBookmarkProject.filter(data => data != dataValue?.key as string));
        } else {
          setBookmarkProject([...cloneBookmarkProject, dataValue?.key as string]);
        }
      } else {
        setSelectedProject({ action: actionType, data: dataValue});
      }
    }
  }

  return (
    <Box className='relative mt-5'>
      <HighlightCarousel title='Ideas'>
        {
          [...dataProjectModel, ...dataProjectExperimentalModel]?.map((data: IProject) => {
            return (
             <Box
              className='w-full relative'
             >
               <PreviewProjectPanel 
                title='Ideas'
                data={data}
                onSlide={(value) => {
                  handleOnProjectAction('visit', value ?? null)
                }}
              />
             </Box>
            )
          })
        }
      </HighlightCarousel>
      <Box className='flex mt-4 mb-10 border-2 border-primary-950 rounded-2xl h-screen shadow-solid'>
        <Box className='flex p-5 bg-primary-800 rounded-s-lg relative border-r-4 border-primary-950'>
          <Typography variant='h1' className='text-primary-300'>Projects</Typography>
        </Box>
        <Box className='w-11/12 pb-5'>
          <Box className='grid grid-cols-1 wide-screen:grid-cols-2 pl-10 pr-10 pb-10 wide-screen:pl-2 h-full overflow-y-auto'>
            {
              dataProjectModel?.map((data: IProject) => {
                return (
                  <ProjectCardContainer 
                    key={`project-container-${data?.key}`}
                    data={data}
                    onClickAction={handleOnProjectAction}
                    isBookmark={bookmarkProject.includes(data?.key)}
                  />
                )
              })
            }
          </Box>
        </Box>
      </Box>

      <Box className='flex flex-col mt-4 mb-10 border-2 border-primary-950 rounded-2xl h-screen shadow-solid'>
        <Box className='p-5  bg-primary-800 rounded-t-lg border-b-4 border-primary-950'>
          <Typography variant='h1' className='text-primary-300'>Experimental</Typography>
        </Box>
        <Box className='pb-5'>
          <Box className='grid grid-cols-1 wide-screen:grid-cols-2 pb-10 gap-2 pl-28 wide-screen:pl-20 h-[800px] overflow-y-auto border rounded-s-lg'>
            {
              dataProjectExperimentalModel?.map((data: IProject) => {
                return (
                  <ProjectCardContainer 
                    key={`project-container-${data?.key}`}
                    data={data}
                    onClickAction={handleOnProjectAction}
                    isBookmark={bookmarkProject.includes(data?.key)}
                  />
                )
              })
            }
          </Box>
        </Box>
      </Box>
      {/* Dialog */}
      <Dialog 
        isOpen={Boolean(selectedProject) && ['open', 'visit'].includes(selectedProject?.action as string)} 
        title={' '}
        onClose={() => setSelectedProject(null)}
        className={selectedProject?.action == 'visit' ? 'w-96' : ''}
      >
        <Box>
         {
          selectedProject?.action == 'open' && (
            <PreviewProjectPanel 
              data={selectedProject?.data}
              onSlide={(value) => {
                handleOnProjectAction('visit', value ?? null)
              }}
            />
          )
         }

         {
          selectedProject?.action == 'visit' && (
            <NoProjectLink data={selectedProject?.data}/>
          )
         }
        </Box>
      </Dialog>
    </Box>
  );
}

export default IdeasPage;
