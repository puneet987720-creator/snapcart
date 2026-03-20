import { SignupForm } from '../components/Auth/Signup';
import { createUserAction } from '../components/Auth/Signup';

import { LoginForm } from '../components/Auth/login.jsx';
import { loginUserAction } from '../components/Auth/login.jsx';

import { VerifyEmailMsg } from '../components/Auth/verifyEmailMsg.jsx';
import { VerifyEmail } from '../components/Auth/VerifyEmail.jsx';
    
export const authRoutes = [
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
]