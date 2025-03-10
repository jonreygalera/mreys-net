import React, { Fragment, useEffect, useState } from 'react';
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

interface Props {
  onMouseEnter?: (navigationItem: INavigationItem) => void;
  onMouseLeave?: () => void;
}

const Navigator: React.FC<Props> = ({ onMouseEnter, onMouseLeave }) => {
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
   <Fragment>
    { selectedNavigationItem && (
      <Navigation 
       className="laptop:ml-4 laptop:top-36"
       activeItem={{...selectedNavigationItem, index: navigationItemIndex}}
      >
        {NAVIGATOR_ITEMS.map((navigationItem, navigationItemIdx) => (
          <Box 
            key={navigationItem.key}
            onMouseEnter={() => onMouseEnter?.(navigationItem as INavigationItem)}
            onMouseLeave={() => onMouseLeave?.()}
            className={
              tailwindUtil(
                "rounded-full",
                selectedNavigationItem.key === navigationItem.key && (
                  "bg-primary-800 border-2 border-primary-400 laptop:border-none"
                ),
                selectedNavigationItem.key !== navigationItem.key && (
                  'hover:animate-bounce'
                )
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
    )}
   </Fragment>
  );
};

export default Navigator;
