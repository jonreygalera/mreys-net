import React, { useState } from "react";
import Box from "../box/Box";
import { tailwindUtil } from "../../utils/tailwindUtil";

interface Props {
  className?: string;
  label?: string;
  labelSlided?: string;
  onSlided?: () => void
}

const Slide: React.FC<Props> = (props) => {
  const {
    className,
    label = 'Slide to Unlock',
    labelSlided = '✅ Unlocked!',
    onSlided
  } = props;

  const [position, setPosition] = useState<number>(0);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const slider = e.currentTarget.parentElement as HTMLDivElement;
    const sliderWidth = slider.offsetWidth;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = slider.getBoundingClientRect();
      const x = Math.min(
        Math.max(event.clientX - rect.left, 0),
        sliderWidth - 60
      );
      setPosition(x);

      if (x >= sliderWidth - 60) {
        onSlided?.();
        setIsUnlocked(true);

        const timeout = setTimeout(() => {
          setPosition(0);
          setIsUnlocked(false);
          clearTimeout(timeout);
        }, 1000)

        document.removeEventListener("mousemove", handleMouseMove);
      }
    };

    const handleMouseUp = () => {
      if (!isUnlocked) setPosition(0);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <Box className={tailwindUtil(
      "relative w-72 h-14 bg-primary-800 rounded-full overflow-hidden border-2 border-primary-950 shadow-solid",
      className
    )}>
      {isUnlocked ? (
        <Box className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-primary-700 to-primary-900 text-primary-50 text-lg font-semibold tracking-wide select-none">
          {labelSlided}
        </Box>
      ) : (
        <>
          <Box className="absolute inset-0 flex items-center justify-center text-primary-400 text-base font-medium tracking-wide select-none">
            {label} →
          </Box>
          <Box
            className="absolute border-2 border-primary-950 left-0 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-primary-700 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300"
            style={{ transform: `translateX(${position}px) translateY(-50%)` }}
            onMouseDown={handleMouseDown}
          >
            <span className="text-primary-50 font-bold select-none">⇌</span>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Slide;
