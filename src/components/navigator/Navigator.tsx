import React, { useState } from 'react';
import { ChatBubbleLeftRightIcon, EllipsisHorizontalCircleIcon, HomeIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import IconButton from '../buttons/IconButton/IconButton';
import Avatar from '../icons/Avatar';
import Profile from '../../data/profile';
import { NavigatorItem } from '../../interface';
import { useNavigate } from 'react-router-dom';

const NAVIGATOR_ITEMS : NavigatorItem[] = [
  { key:"nav-item-home", label: 'Home', icon: HomeIcon, path: '/' },
  { key:"nav-item-ideas", label: 'Ideas', icon: PuzzlePieceIcon, path: 'ideas' },
  { key:"nav-item-talk", label: 'Talk', icon: ChatBubbleLeftRightIcon },
  { key:"nav-item-others", label: 'Others', icon: EllipsisHorizontalCircleIcon, path: 'others'  },
];

const navItemTalkClassNameDefault ="bg-primary-900";
const navItemTalkClassNameSelected = "bg-primary-800";

const PROFILE_NAVIGATOR_ITEM : NavigatorItem = { key:"nav-item-profile", label: 'Profile', icon: Avatar, path: 'me' };

const Navigator : React.FC = () => {
  const [ selectedNavigatorItem, setSelectedNavigatorItem ] = useState<NavigatorItem>(NAVIGATOR_ITEMS[0]);

  const navigate = useNavigate();

  function onHandleNavigatorSelected(navItemValue : NavigatorItem) {
    setSelectedNavigatorItem(navItemValue);
    if(navItemValue.key === "nav-item-talk") {
      alert("Talk with me!");
    }
    navigate(navItemValue.path ?? '');
  }

  return (
   <div className="fixed bottom-1 left-3 md:left-20 mx-1 w-11/12 md:w-9/10">
     <nav className="flex justify-around rounded-full border-1 border-t-primary-500 bg-primary-950 p-2">
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
        onClick={(event) => onHandleNavigatorSelected(PROFILE_NAVIGATOR_ITEM)}
        isSelected={selectedNavigatorItem.key === PROFILE_NAVIGATOR_ITEM.key}
      />
    </nav>
   </div>
  )
}

export default Navigator;