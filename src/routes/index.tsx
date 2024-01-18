import { Outlet, type RouteObject } from 'react-router';
import LoginPage from '../pages/auth/login';
import SignUp from '../pages/auth/signup';
import HomePage from '../pages/home';
import { adminRoutes } from './admin';

export const routes: RouteObject[] = [
  {
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      {
        index: true,
        element: <HomePage />
      }
    ]
  },
  ...adminRoutes,
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/login',
    element: <LoginPage />
  }
];
