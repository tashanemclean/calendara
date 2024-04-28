import { RouteObject } from 'react-router-dom';

import { NotFound } from '../components/404NotFound';
import { AuthenticationLayout, ProtectedRouteLayout } from '../components/Auth/ProtectedRoute';
import DemoIndex from '../views/demo';
import HomeIndex from '../views/home';
import { Login } from '../views/login';
import PdfIndex from '../views/pdf';
import RouteConstants from './RouteConstants';

export const routes: RouteObject[] = [
  {
    path: '',
    element: <AuthenticationLayout />,
    children: [
      {
        path: RouteConstants.login,
        element: <Login />,
      },
    ],
  },
  {
    path: RouteConstants.demo,
    element: <DemoIndex />,
  },
  {
    path: RouteConstants.NotFound,
    element: <NotFound />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/',
    element: <ProtectedRouteLayout />,
    children: [
      {
        path: RouteConstants.home,
        element: <HomeIndex />,
        children: [
          {
            path: ':home',
            element: <HomeIndex />,
          },
        ],
      },
      {
        path: RouteConstants.pdf,
        element: <PdfIndex />,
        children: [
          {
            path: ':pdf',
            element: <PdfIndex />,
          },
        ],
      },
    ],
  },
];
