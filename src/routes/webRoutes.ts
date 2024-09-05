import { createBrowserRouter } from "react-router-dom";
import { HomePage, IdeasPage, OthersPage, ProfilePage } from "../pages";
import App from "../App";

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
    path: 'others',
    element: OthersPage
  },
  {
    path: 'me',
    element: ProfilePage
  }
];

export default webRoutes;