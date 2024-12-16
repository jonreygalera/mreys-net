import React, { useEffect, useState } from 'react';
import Box from '../box/Box';

interface Props {
  onScrollY?: (value: number) => void;
}

const ScrollIndicator: React.FC<Props> = ({onScrollY}) => {
  const [scrollWidth, setScrollWidth] = useState<number>(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const width = (scrollTop / documentHeight) * 100;
    setScrollWidth(width);
    onScrollY?.(width)
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      className="fixed top-0 left-0 w-full z-50 flex items-start justify-start"
    >
      <Box
        className="h-1 w-full bg-primary-800 z-50 flex items-end justify-end"
        style={{
          width: `${scrollWidth}%`
        }}
      />
    </Box>
  );
}

export default ScrollIndicator;
