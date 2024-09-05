import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import webRoutes from "./webRoutes";
import NotFoundPage from "../pages/NotFoundPage";

const RootRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        {
          webRoutes.map((route) => (
            <Route Component={route.element} path={route.path}/>
          ));
        }
        <Route path='*' element={<NotFoundPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default RootRoute;

