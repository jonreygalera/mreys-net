import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Base from '../Base';
import webRoutes from './webRoutes';
import GamePage from '../pages/GamePage';

const RootRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Base/>}>
          { 
            webRoutes.map((route, routeIdx) => (
              <Route key={`mreycode-route-${routeIdx}`} Component={route?.element} path={route?.path} />
            ))
          }
        </Route>
        <Route path='/game' Component={GamePage}/>
      </Routes>
    </BrowserRouter>
  );
}

export default RootRoute;
