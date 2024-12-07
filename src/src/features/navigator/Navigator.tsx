import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ChatBubbleLeftRightIcon,
  EllipsisHorizontalCircleIcon,
  HomeIcon,
  PuzzlePieceIcon,
} from '@heroicons/react/24/outline';
import Navigation from '../../components/navigation/Navigation';
import IconButton from '../../components/iconButton/IconButton';
import INavigationItem from '../../interface/INavigationItem';
import Box from '../../components/box/Box';
import { tailwindUtil } from '../../utils/tailwindUtil';

const NAVIGATOR_ITEMS: INavigationItem[] = [
  { key: 'nav-item-home', label: 'Home', icon: HomeIcon, path: '/' },
  { key: 'nav-item-ideas', label: 'Ideas', icon: PuzzlePieceIcon, path: '/ideas' },
  { key: 'nav-item-talk', label: 'Talk', icon: ChatBubbleLeftRightIcon },
  { key: 'nav-item-others', label: 'Others', icon: EllipsisHorizontalCircleIcon, path: '/others' },
  { key: 'nav-item-profile', label: 'Profile', icon: EllipsisHorizontalCircleIcon, path: '/profile' },
];

const Navigator: React.FC = () => {
  const navigate = useNavigate();
  const routeLocation = useLocation();

  const [selectedNavigationItem, setSelectedNavigationItem] = useState<INavigationItem>(
    NAVIGATOR_ITEMS[0]
  );

  const [ navigationItemIndex, setNavigationItemIndex ] = useState(0);

  const handleOnSelectedItem = (navigationItem: INavigationItem, itemIndex: number) => {
    setSelectedNavigationItem(navigationItem);
    setNavigationItemIndex(itemIndex);
    if (navigationItem.path) {
      navigate(navigationItem.path);
    }
  };

  useEffect(() => {
    if(routeLocation) {
      setSelectedNavigationItem(NAVIGATOR_ITEMS.find(nav => nav.path == routeLocation.pathname) as INavigationItem);
      setNavigationItemIndex(NAVIGATOR_ITEMS.findIndex(nav => nav.path == routeLocation.pathname));
    }
  }, [routeLocation]);

  return (
    <Navigation 
      className="ml-4 top-36"
      activeItem={{...selectedNavigationItem, index: navigationItemIndex}}
    >
      
      {NAVIGATOR_ITEMS.map((navigationItem, navigationItemIdx) => (
        <Box 
          key={navigationItem.key}
          className={
            tailwindUtil(
              " rounded-e-3xl rounded-s-full",
              // selectedNavigationItem.key === navigationItem.key && (
              //   "bg-primary-50 "
              // )
            )
          } 
        >
          <IconButton
            icon={navigationItem.icon}
            onClick={() => handleOnSelectedItem(navigationItem, navigationItemIdx)}
            active={selectedNavigationItem.key === navigationItem.key}
            label={navigationItem.label}
          />
        </Box>
        ))}
    </Navigation>
  );
};

export default Navigator;
