import { useLocalStorage } from '@lilib/hooks';
import { Navigate, Outlet } from 'react-router-dom';

import AppLayout from '../../App';
import { AuthProvider } from '../../contexts/authContext';
import RouteConstants from '../../routing/RouteConstants';

// Authentication to be used for user demo state, claims is unset, always resolving users to demo screen
// TODO hide demo screen from users who are logged in
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

// Layout function, asserts if user claims exists, resolves user path to the root outlet if authenticated
// Otherwise navigate user to login screen
export const ProtectedRouteLayout = () => {
  const [userClaims] = useLocalStorage('userClaims');

  if (!userClaims) {
    return <Navigate to={RouteConstants.login} />;
  }

  return <AppLayout />;
};
