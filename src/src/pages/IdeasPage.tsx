import React, {  useEffect, useState } from 'react';
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
import { getNShuffleddata } from '../utils/arrayUtil';

interface ISelectedProject {
  action: actionType,
  data: IProject | null
}

const IdeasPage: React.FC = () => {

  const { data: dataProjectModel } = useProjectModelHook({ key: 'all', value: 'all'})
  const { data: dataProjectExperimentalModel } = useProjectExperimentalModelHook({ key: 'all', value: 'all'})

  const [ selectedProject, setSelectedProject ] = useState<ISelectedProject | null>(null);
  const [ bookmarkProject , setBookmarkProject ] = useLocalStorage<string[]>('bookmark-project', []);
  const [ featuredProject, setFeaturedProject ] = useState<IProject[]>([]);

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

    useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedProject([...getNShuffleddata(dataProjectModel, 5), ...getNShuffleddata(dataProjectExperimentalModel, 5)])
    }, 600 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dataProjectModel, dataProjectExperimentalModel]);

  return (
    <Box className='relative mt-5'>
      <HighlightCarousel title='Ideas'>
        {
          (featuredProject.length > 0 ? featuredProject : [...getNShuffleddata(dataProjectModel, 5), ...getNShuffleddata(dataProjectExperimentalModel, 5)])?.map((data: IProject) => {
            return (
             <Box
              className='w-full relative'
             >
               <PreviewProjectPanel 
                title='Ideas'
                data={data}
                onAction={(action, value) => {
                  handleOnProjectAction(action, value ?? null)
                }}
              />
             </Box>
            )
          })
        }
      </HighlightCarousel>
      <Box className='flex flex-col mobile:flex-row mt-4 mb-10 border-2 border-primary-950 rounded-2xl laptop:h-screen shadow-solid'>
        <Box className='flex p-5 bg-primary-800 rounded-t-lg laptop:rounded-e-none laptop:rounded-s-lg relative laptop:border-r-4 border-primary-950'>
          <Typography variant='h1' className='text-primary-300 laptop:mb-8'>Projects</Typography>
        </Box>
        <Box className='laptop:w-11/12 pb-5 px-1'>
          <Box className='grid grid-cols-1 wide-screen:grid-cols-2 laptop:pl-10 laptop:pr-10 laptop:pb-10 wide-screen:pl-2 laptop:h-full h-[500px] overflow-y-auto gap-4 laptop:gap-0'>
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

      <Box className='flex flex-col mt-4 mb-10 border-2 border-primary-950 rounded-2xl laptop:h-full h-[500px] shadow-solid'>
        <Box className='p-5 bg-primary-800 rounded-t-lg border-b-4 border-primary-950'>
          <Typography variant='h1' className='text-primary-300'>Experimental</Typography>
        </Box>
        <Box className='pb-5 px-1'>
          <Box className='grid grid-cols-1 wide-screen:grid-cols-2 pb-10 gap-2 laptop:pl-28 wide-screen:pl-20 h-[400px] laptop:h-[800px] overflow-y-auto rounded-s-lg'>
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
              onAction={(action, value) => {
                handleOnProjectAction(action, value ?? null)
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
