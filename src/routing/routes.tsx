import { RouteObject } from 'react-router-dom';
import { AuthenticationLayout, ProtectedRouteLayout } from '../components/Auth/ProtectedRoute';
import RouteConstants from './RouteConstants';
import { Login } from '../views/login';
import { NotFound } from '../components/404NotFound';
import HomeIndex from '../views/home';
import DemoIndex from '../views/demo';
import PdfIndex from '../views/pdf';

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
