import React, { PropsWithChildren } from 'react';
import Button from '../button/Button';

interface Props extends PropsWithChildren {
  onClick?: () => void
}

const Chip: React.FC<Props> = (props) => {
  const { children, onClick } = props;
  return (
    <Button 
      onClick={onClick}
      className="bg-primary-50 border-2 shadow-solid border-primary-950 font-medium rounded-full text-sm px-5 py-1 text-center inline-flex items-center max-h-8 gap-2"
    >
      { children }
    </Button>
  );
}

export default Chip;
