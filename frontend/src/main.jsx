import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Welcome } from './components/pages/Welcome.jsx';

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
