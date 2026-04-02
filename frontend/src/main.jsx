import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Welcome } from './components/pages/Welcome.jsx';
import { NotFound404 } from './components/pages/404Page.jsx';

import {authRoutes} from './router/auth-routes.jsx';
import { productRoutes } from './router/productRoutes.jsx';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import App from './router/App.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "*",
        element: <NotFound404 />,
      },
      ...authRoutes,
      ...productRoutes
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
