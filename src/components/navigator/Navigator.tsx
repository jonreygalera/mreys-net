import React, { useState } from 'react';
import { ChatBubbleLeftRightIcon, EllipsisHorizontalCircleIcon, HomeIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import IconButton from '../buttons/IconButton/IconButton';
import Avatar from '../icons/Avatar';
import Profile from '../../data/profile';
import { NavigatorItem } from '../../interface';

const NAVIGATOR_ITEMS : NavigatorItem[] = [
  { key:"nav-item-home", label: 'Home', icon: HomeIcon, path: 'home' },
  { key:"nav-item-ideas", label: 'Ideas', icon: PuzzlePieceIcon, path: 'ideas' },
  { key:"nav-item-talk", label: 'Talk', icon: ChatBubbleLeftRightIcon },
  { key:"nav-item-others", label: 'Others', icon: EllipsisHorizontalCircleIcon, path: 'others'  },
];

const PROFILE_NAVIGATOR_ITEM : NavigatorItem = { key:"nav-item-profile", label: 'Profile', icon: Avatar, path: 'profile' };

const Navigator : React.FC = () => {
  const [ selectedNavigatorItem, setSelectedNavigatorItem ] = useState<NavigatorItem>(NAVIGATOR_ITEMS[0]);

  const navItemTalkClassNameDefault ="bg-primary-900";
  const navItemTalkClassNameSelected = "bg-primary-800";

  function onHandleNavigatorSelected(navItemValue : NavigatorItem) {
    setSelectedNavigatorItem(navItemValue);
    if(navItemValue.key === "nav-item-talk") {
      alert("Talk with me!");
    }
  }

  return (
   <div className="fixed bottom-0 left-0 w-full">
     <nav className="flex justify-around rounded-t-xl border-1 border-t-primary-500 bg-primary-950 px-4">
      {
        NAVIGATOR_ITEMS.map((navItemValue, navItemKey) => (
          <IconButton
            classNameDefault={(navItemValue.key === "nav-item-talk") && navItemTalkClassNameDefault} 
            classNameSelected={(navItemValue.key === "nav-item-talk") && navItemTalkClassNameSelected} 
            key={navItemValue.key} 
            label={navItemValue.label} 
            IconComponent={navItemValue.icon} 
            IconComponentProps={{className: "size-6"}}
            onClick={(event) => onHandleNavigatorSelected(navItemValue)}
            isSelected={selectedNavigatorItem.key === navItemValue.key}
          />
        ))
      }

      <IconButton 
        key={PROFILE_NAVIGATOR_ITEM.key} 
        label={PROFILE_NAVIGATOR_ITEM.label} 
        IconComponent={PROFILE_NAVIGATOR_ITEM.icon} 
        IconComponentProps={{
          className: `size-6 ${(selectedNavigatorItem.key === PROFILE_NAVIGATOR_ITEM.key) ? " border-primary-50 border-2" : " border-primary-400 border"}`, 
          src: Profile.avatar
        }}
        onClick={(event) => setSelectedNavigatorItem(PROFILE_NAVIGATOR_ITEM)}
        isSelected={selectedNavigatorItem.key === PROFILE_NAVIGATOR_ITEM.key}
      />
    </nav>
   </div>
  )
}

export default Navigator;