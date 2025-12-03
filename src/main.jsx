import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import AuthProvider from "./provider/AuthProvider.jsx";

// 레이아웃
import DefaultLayout from "./components/layout/DefaultLayout.jsx";
import AuthLayout from "./components/layout/AuthLayout.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Items from "./pages/Items.jsx";
import AddItem from "./pages/AddItem.jsx";
import ItemDetail from "./pages/ItemDetail.jsx";
import Community from "./pages/Community.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        // default layout group
        Component: DefaultLayout,
        children: [
          { index: true, Component: Home },
          {
            path: "community",
            Component: Community,
          },
          {
            path: "items",
            children: [
              {
                index: true,
                Component: Items,
              },
              {
                path: "additem",
                Component: AddItem,
              },
              {
                path: ":itemId",
                Component: ItemDetail,
              },
            ],
          },
        ],
      },
      {
        // auth layout group
        Component: AuthLayout,
        children: [
          {
            path: "login",
            Component: Login,
          },
          {
            path: "signup",
            Component: Signup,
          },
        ],
      },
    ],
  },
]);

import "./assets/styles/reset.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
