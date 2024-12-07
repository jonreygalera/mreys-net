import React from 'react';
import Box from '../components/box/Box';

interface Props {

}

const ProfilePage: React.FC<Props> = () => {
  return (
    <Box className='flex h-screen items-center justify-center'>
      Jon Rey Galera | Ongoing
    </Box>
  );
}

export default ProfilePage;
