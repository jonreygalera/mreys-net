import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Base from '../Base';
import webRoutes from './webRoutes';
import GamePage from '../pages/GamePage';
import PdfSplitterPage from '../pages/PdfSplitterPage';

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
        <Route path='/addy-adventure' Component={GamePage}/>
        <Route path='/pdf-splitter' Component={PdfSplitterPage}/>
      </Routes>
    </BrowserRouter>
  );
}

export default RootRoute;
