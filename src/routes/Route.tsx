import type { RouteObject } from "react-router-dom";
import Home from "../components/pages/Home";
import MovieDetail from "../components/pages/MovieDetail";
import Popular from "../components/pages/Popular";
import MainLayout from "../layouts/MainLayout";

const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/popular",
        element: <Popular />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetail />,
      },
    ],
  },
];

export default routes;
