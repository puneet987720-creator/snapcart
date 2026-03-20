import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { SignupForm } from './components/Auth/Signup';
import { createUserAction } from './components/Auth/Signup';

import { LoginForm } from './components/Auth/login.jsx';
import { loginUserAction } from './components/Auth/login.jsx';

import { VerifyEmailMsg } from './components/Auth/verifyEmailMsg.jsx';
import { VerifyEmail } from './components/Auth/VerifyEmail.jsx';

import { Welcome } from './components/pages/Welcome.jsx';

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
        path: "/signup",
        element: <SignupForm />,
        action: createUserAction,
      },
      {
        path: "/verify-emailMsg",
        element: <VerifyEmailMsg />,
      },
      {
        path: "/verify-email/:token",
        element: <VerifyEmail />,
      },
      {
        path: "/login",
        element: <LoginForm />,
        action: loginUserAction,
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
