import { AxiosError } from 'axios';
import { createContext, ReactNode, useCallback, useContext, useMemo, useReducer } from 'react';

import apiResponseReducer, { ApiActionTypes, ApiState, initialState } from '../reducers/api';
import * as service from '../services/options';
import { ApiRequestPayload, toFlatDataObject } from '../utils/adapters';
import useCustomToast from '../utils/useCustomToast';

interface ApiContextActions {
  getResponse: (data: ApiRequestPayload) => Promise<void>;
}

const initialContext: ApiContextActions = {
  getResponse: async () => {},
};

export const ApiResponseContext = createContext<{ state: ApiState; actions: ApiContextActions }>({
  state: initialState,
  actions: initialContext,
});

export function ApiResponseProvider({ children }: Readonly<{ children: ReactNode | ReactNode[] }>) {
  const [state, dispatch] = useReducer(apiResponseReducer, initialState);
  const { errorToast, successToast } = useCustomToast();

  const getResponse = useCallback(
    async (data: ApiRequestPayload) => {
      dispatch({ type: ApiActionTypes.GET_RESPONSE_INIT });
      try {
        const result = await service.getResponses(data);
        if (result) {
          dispatch({ type: ApiActionTypes.GET_RESPONSE_SUCCESS, payload: toFlatDataObject(result) });
          successToast('successfully found matching activities');
        }
      } catch (err: unknown) {
        const axiosErr = err as AxiosError;
        dispatch({ type: ApiActionTypes.GET_RESPONSE_FAIL, payload: axiosErr.message });
        errorToast('error with request');
      }
    },
    [errorToast, successToast],
  );

  const value = useMemo(
    () => ({
      state,
      actions: {
        ...initialContext,
        getResponse,
      },
    }),
    [state, getResponse],
  );

  return <ApiResponseContext.Provider value={value}>{children}</ApiResponseContext.Provider>;
}

ApiResponseContext.displayName = 'ApiResponseContext';
export const useApiResponseContext = () => useContext(ApiResponseContext);
