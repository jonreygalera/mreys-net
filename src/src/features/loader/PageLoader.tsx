import Box from '../../components/box/Box';
import Typography from '../../components/typography/Typography';

const PageLoader = () => {
  return (
    <Box 
      className='bg-red-500 h-screen w-screen flex transition-all'
    >
      <Box
        className='w-1/2 h-screen bg-primary-800 flex justify-end items-center'
      >
        <Typography variant='title' className='text-primary-50 animate-bounce'>LOAD</Typography>
      </Box>
      <Box
        className='w-1/2 h-screen bg-primary-50 flex justify-start items-center'
      >
        <Typography variant='title' className='text-primary-800 animate-bounce'>iNG</Typography>
      </Box>
    </Box>
  );
}

export default PageLoader;
