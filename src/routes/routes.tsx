import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import AddRecipes from "../pages/addRecipes/AddRecipes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "add-recipes",
        element: <AddRecipes />,
      },
    ],
  },
]);

export default routes;
