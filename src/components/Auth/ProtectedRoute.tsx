import { useLocalStorage } from '@lilib/hooks';
import { Navigate, Outlet } from 'react-router-dom';

import AppLayout from '../../App';
import { AuthProvider } from '../../contexts/authContext';
import RouteConstants from '../../routing/RouteConstants';

export const AuthenticationLayout = () => {
  const [userClaims] = useLocalStorage('userClaims');

  if (!userClaims) {
    return (
      <Navigate
        to={RouteConstants.demo}
        replace
      />
    );
  }

  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export const ProtectedRouteLayout = () => {
  const [userClaims] = useLocalStorage('userClaims');

  if (!userClaims) {
    return <Navigate to={RouteConstants.login} />;
  }

  return <AppLayout />;
};
