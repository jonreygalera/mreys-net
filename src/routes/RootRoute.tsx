import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import webRoutes from "./webRoutes";
import NotFoundPage from "../pages/NotFoundPage";
import Base from "../Base";

const RootRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Base />}>
          {
            webRoutes.map((route) => (
              <Route Component={route.element} path={route.path}/>
            ))
          }
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RootRoute;

