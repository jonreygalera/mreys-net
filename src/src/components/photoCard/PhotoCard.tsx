import React, { useState } from 'react';
import Box from '../box/Box';
import IPhotoCardProps from '../../interface/IPhotoCardProps';
import { tailwindUtil } from '../../utils/tailwindUtil';

const PhotoCard: React.FC<IPhotoCardProps> = (props) => {
  const {
    src = '',
    onClick,
    height = 'h-32',
    width = 'w-24',
  } = props;

  const [ showHighlight, setShowHighlight ] = useState(false);

  const handleOnMouseAction = () => setShowHighlight(prev => !prev);

  return (
    <Box 
      className={tailwindUtil(`
        absolute 
        rounded-3xl 
        overflow-hidden 
        cursor-pointer
        border-2
        border-primary-950
        bg-primary-50
      `, 
      typeof height == 'string' ? height : `h-${height}`,
      typeof width == 'string' ? width : `w-${width}`
      )}
      onMouseEnter={handleOnMouseAction}
      onMouseLeave={handleOnMouseAction}
    >
      <a 
        onClick={onClick} 
      >
        <img 
          src={src} 
          alt="Sample Image" 
          className="w-full h-full object-fit grayscale hover:grayscale-0"  
        />
      </a>
      <Box 
        className={tailwindUtil("border-4 border-primary-950 w-9 fixed left-8 top-[120px] rounded-t-full", showHighlight && "border-primary-600")}
      />
    </Box>
  )
}

export default React.memo(PhotoCard);
