import { lazy } from "react";

const HomePage = lazy(() => import('../pages/HomePage'));
const IdeasPage = lazy(() => import('../pages/IdeasPage'));
const OtherPage = lazy(() => import('../pages/OtherPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));

export default Object.freeze([
  {
    path: '/',
    element: HomePage
  },
  {
    path: '/ideas',
    element: IdeasPage
  },
  {
    path: '/others',
    element: OtherPage
  },
  {
    path: '/profile',
    element: ProfilePage
  }
])