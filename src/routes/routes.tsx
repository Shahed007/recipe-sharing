import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import AddRecipes from "../pages/addRecipes/AddRecipes";
import Payment from "../payment/Payment";
import PurchaseCoin from "../pages/purchseCoin/PurchaseCoin";

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
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/purchase-coin",
        element: <PurchaseCoin />,
      },
    ],
  },
]);

export default routes;
