import React from 'react';
import Box from '../components/box/Box';
import Typography from '../components/typography/Typography';
import Game from '../games/AddyAdventure/Game';

interface Props {

}

const GamePage: React.FC<Props> = () => {
  return (
   <Game/>
  );
}

export default GamePage;
