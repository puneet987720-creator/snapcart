import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SignupForm } from './components/Auth/Signup';
import { VerifyEmailMsg } from './components/Auth/verifyEmailMsg.jsx';
import { VerifyEmail } from './components/Auth/VerifyEmail.jsx';
import { createUserAction } from './components/Auth/Signup';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import App from './router/App.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
