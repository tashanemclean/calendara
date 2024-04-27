import { createContext, ReactNode, useCallback, useContext, useMemo, useReducer } from 'react';
import authReducer, { AuthActionTypes, AuthState, initialState } from '../reducers/auth';
import useCustomToast from '../utils/useCustomToast';
import { useLocalStorage, useUpdate } from '@lilib/hooks';
import { AxiosError } from 'axios';
import { handleApiError } from '../utils/errors';
import * as strings from '../constants/strings';
import * as authService from '../services/auth';

import { useNavigate } from 'react-router-dom';
import RouteConstants from '../routing/RouteConstants';

interface AuthContextActions {
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, callback?: () => void) => void;
}

const initialContext: AuthContextActions = {
  login: async () => {},
  logout: async () => {},
  signup: () => null,
};

export const AuthContext = createContext<{
  state: AuthState;
  actions: AuthContextActions;
}>({
  state: initialState,
  actions: initialContext,
});

export function AuthProvider({ children }: Readonly<{ children: ReactNode | ReactNode[] }>) {
  const { errorToast, successToast } = useCustomToast();
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  // Local storage init
  const [userClaims, setUserClaims] = useLocalStorage<{ accessToken: string }>('userClaims');

  const login = useCallback(
    async (email: string, password: string) => {
      dispatch({ type: AuthActionTypes.LOGIN_INIT });

      try {
        const resp = await authService.login(email.trim(), password);
        dispatch({
          type: AuthActionTypes.LOGIN_SUCCESS,
          payload: resp,
        });
        setUserClaims({ accessToken: resp.token });
      } catch (err: unknown) {
        const axiosErr = err as AxiosError;
        const message = handleApiError(axiosErr);
        dispatch({
          type: AuthActionTypes.LOGIN_FAIL,
          payload: message || strings.INVALID_LOGIN,
        });
      }
    },
    [setUserClaims],
  );

  const logout = useCallback(async () => {
    dispatch({ type: AuthActionTypes.LOGOUT_INIT });

    try {
      await authService.logout();
      dispatch({ type: AuthActionTypes.LOGOUT_SUCCESS });
      localStorage.clear();
      successToast('Logged out');
    } catch (err: unknown) {
      const axiosErr = err as AxiosError;
      dispatch({ type: AuthActionTypes.LOGOUT_FAIL, payload: axiosErr.message });
      errorToast('Logout fail');
    }
  }, [errorToast, successToast]);

  useUpdate(() => {
    if (userClaims) {
      navigate(RouteConstants.home);
    }
  }, [userClaims]);

  const value = useMemo(
    () => ({
      state,
      actions: {
        ...initialContext,
        login,
        logout,
      },
    }),
    [state, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContext.displayName = 'AuthContext';

export const useAuth = () => useContext(AuthContext);
