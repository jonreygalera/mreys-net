import { HomePage, IdeasPage, OthersPage, ProfilePage, TalkPage } from "../pages";

const webRoutes = [
  {
    path: '',
    element: HomePage
  },
  {
    path: 'ideas',
    element: IdeasPage
  },
  {
    path: 'talk',
    element: TalkPage
  },
  {
    path: 'others',
    element: OthersPage
  },
  {
    path: 'me',
    element: ProfilePage
  }
];

export default webRoutes;