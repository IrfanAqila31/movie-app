import type { RouteObject } from "react-router-dom";
import Home from "../components/pages/Home";
import MovieDetail from "../components/pages/MovieDetail";

const routes : RouteObject[] = [
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/movie/:id',
        element:<MovieDetail/>
    }
]

export default routes