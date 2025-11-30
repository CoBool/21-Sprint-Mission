import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Items from './pages/Items.jsx';
import AddItem from './pages/AddItem.jsx';
import ItemDetail from './pages/ItemDetail.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/items",
    element: <Items />,
  },
  {
    path: "/items/additem",
    element: <AddItem />,
  },
  {
    path: "/items/:itemId",
    element: <ItemDetail />,
  },
]);

import './assets/styles/reset.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
