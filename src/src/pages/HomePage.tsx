import React from 'react';
import Box from '../components/box/Box';
import Typography from '../components/typography/Typography';

interface Props {

}

const HomePage: React.FC<Props> = () => {
  return (
    <Box className='flex flex-col h-screen items-center justify-center'>
      <Typography>
        Jon Rey Galera | Ongoing
      </Typography>
       <a href='/ideas' className=''>Click here to check my project</a>
    </Box>
  );
}

export default HomePage;
