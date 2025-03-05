import React from 'react';
import Box from '../components/box/Box';
import Typography from '../components/typography/Typography';

interface Props {

}

const HomePage: React.FC<Props> = () => {
  return (
    <Box className='flex flex-col h-screen items-center justify-center gap-11'>
      <Typography variant='title'>
        Jon Rey Galera | Ongoing
      </Typography>
      <Box
        className='flex gap-1 items-center flex-col'
      >
        <Typography variant='title' className='text-red-600'>
          { (new Date()).getFullYear() - 2019 } 
        </Typography>
        <Typography variant='h4'>Years of Professional Experience as a Software Engineer</Typography>
      </Box>
      <a href='/ideas' className='italic underline'>Click here to check my project</a>
    </Box>
  );
}

export default HomePage;
