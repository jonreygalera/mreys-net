import React from 'react';
import Box from '../../components/box/Box';
import { tailwindUtil } from '../../utils/tailwindUtil';

interface Props {

}

const BubbleChat: React.FC<Props> = () => {
  return (
    <Box
      className={
        tailwindUtil('bubble')
      }
    >
      Hey! Good day
    </Box>
  );
}

export default BubbleChat;
