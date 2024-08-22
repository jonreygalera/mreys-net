import React from 'react';
import { ChatBubbleLeftRightIcon, EllipsisHorizontalCircleIcon, HomeIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';

const NAV_LIST = [
  { label: 'Home', icon: HomeIcon },
  { label: 'Ideas', icon: PuzzlePieceIcon },
  { label: 'Talk', icon: ChatBubbleLeftRightIcon },
  { label: 'Others', icon: EllipsisHorizontalCircleIcon  },
  { label: 'Profile', icon: HomeIcon },
];

type IconButtonProps = { 
  label: string;
  IconComponent: any; 
  IconComponentProps: any;
  isSelected?: boolean 
}

function IconButton({ label, IconComponent, IconComponentProps, isSelected = false } : IconButtonProps) {

  let divOuterContainerClassName = "flex items-center border-zinc-300 rounded-xl p-3";
  let iconClassName = " text-zinc-400";
  let labelClassName = " text-zinc-400";

  if(isSelected) {
    divOuterContainerClassName += " border-b";
    iconClassName = " text-zinc-50";
    labelClassName = " text-zinc-50";
  }
  

  return (
    <div className={divOuterContainerClassName}>
      <button onClick={(event) => console.log('yeah')}>
        {
          React.createElement(IconComponent, {...IconComponentProps, className: IconComponentProps.className + iconClassName })
        }
        <span className={labelClassName}>{label}</span>
      </button>
    </div>
  )
}

export default function MobileNavigator() {
  return (
   <div className="fixed bottom-0 left-0 w-full">
     <nav className="flex justify-between p-2 rounded-t-xl bg-zinc-950">
      {
        NAV_LIST.map((navItemValue, navItemKey) => (
          (navItemValue.label == 'Talk') ? (
            <IconButton 
              key={`mobile-nav-${navItemKey}`} 
              label={navItemValue.label} 
              IconComponent={navItemValue.icon} 
              IconComponentProps={{className: "size-6"}}
            />
          ) : (<IconButton 
                  key={`mobile-nav-${navItemKey}`} 
                  label={navItemValue.label} 
                  IconComponent={navItemValue.icon} 
                  IconComponentProps={{className: "size-6"}}
                  isSelected={navItemValue.label === 'Home'}
                />
              )
        ))
      }
    </nav>
   </div>
  )
}