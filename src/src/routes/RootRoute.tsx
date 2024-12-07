import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Base from '../Base';
import webRoutes from './webRoutes';

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
      </Routes>
    </BrowserRouter>
  );
}

export default RootRoute;
