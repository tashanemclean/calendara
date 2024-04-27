import { AuthLoginResponse } from './types';

export enum AuthActionTypes {
  LOGIN_INIT = 'LOGIN_INIT',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
  LOGOUT_INIT = 'LOGOUT_INIT',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  LOGOUT_FAIL = 'LOGOUT_FAIL',
  SIGNUP_INIT = 'SIGNUP_INIT',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  SIGNUP_FAIL = 'SIGNUP_FAIL',
}

export interface AuthState {
  user: AuthLoginResponse | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

interface LoginInitAction {
  type: AuthActionTypes.LOGIN_INIT;
  payload?: void;
}

interface LoginSuccessAction {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: AuthLoginResponse;
}

interface LoginFailAction {
  type: AuthActionTypes.LOGIN_FAIL;
  payload: string;
}

interface LogoutInitAction {
  type: AuthActionTypes.LOGOUT_INIT;
  payload?: void;
}

interface LogoutSuccessAction {
  type: AuthActionTypes.LOGOUT_SUCCESS;
  payload?: void;
}

interface LogoutFailAction {
  type: AuthActionTypes.LOGOUT_FAIL;
  payload: string;
}

interface SignupInitAction {
  type: AuthActionTypes.SIGNUP_INIT;
  payload?: void;
}

interface SignupSuccessAction {
  type: AuthActionTypes.SIGNUP_SUCCESS;
  payload: AuthLoginResponse;
}

interface SignupFailAction {
  type: AuthActionTypes.SIGNUP_FAIL;
  payload: string;
}

type AuthAction =
  | LoginInitAction
  | LoginSuccessAction
  | LoginFailAction
  | LogoutInitAction
  | LogoutSuccessAction
  | LogoutFailAction
  | SignupInitAction
  | SignupSuccessAction
  | SignupFailAction;

const authReducer = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  { type, payload }: AuthAction,
): AuthState => {
  switch (type) {
    case AuthActionTypes.LOGIN_INIT: {
      return {
        ...state,
        user: null,
        loading: true,
        error: null,
      };
    }
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        user: payload,
        loading: false,
      };
    }
    case AuthActionTypes.LOGIN_FAIL: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    case AuthActionTypes.LOGOUT_INIT: {
      return {
        ...state,
        user: null,
        loading: true,
        error: null,
      };
    }
    case AuthActionTypes.LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
        loading: false,
      };
    }
    case AuthActionTypes.LOGOUT_FAIL: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    case AuthActionTypes.SIGNUP_INIT: {
      return {
        ...state,
        user: null,
        loading: true,
        error: null,
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        user: null,
        loading: false,
      };
    }
    case AuthActionTypes.SIGNUP_FAIL: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    default:
      throw new Error(`No case found in auth-reducer`);
  }
};

export default authReducer;
