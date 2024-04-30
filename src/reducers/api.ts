export type ApiResponse = {
  activities: string[];
};

export enum ApiActionTypes {
  GET_RESPONSE_INIT = 'GET_RESPONSE_INIT',
  GET_RESPONSE_SUCCESS = 'GET_RESPONSE_SUCCESS',
  GET_RESPONSE_FAIL = 'GET_RESPONSE_FAIL',
}

interface GetResponseInit {
  type: ApiActionTypes.GET_RESPONSE_INIT;
  payload?: void;
}

interface GetResponseSuccess {
  type: ApiActionTypes.GET_RESPONSE_SUCCESS;
  payload: ApiResponse;
}

interface GetResponseFail {
  type: ApiActionTypes.GET_RESPONSE_FAIL;
  payload: string;
}

type ApiAction = GetResponseInit | GetResponseSuccess | GetResponseFail;

export interface ApiState {
  responses: any[] | null;
  error?: string | null;
  loading?: boolean;
}

export const initialState: ApiState = {
  responses: null,
  error: null,
  loading: false,
};

const apiResponseReducer = (state = initialState, { type, payload }: ApiAction): ApiState => {
  switch (type) {
    case ApiActionTypes.GET_RESPONSE_INIT: {
      return {
        ...state,
        error: null,
        responses: null,
        loading: false,
      };
    }
    case ApiActionTypes.GET_RESPONSE_SUCCESS: {
      return {
        ...state,
        responses: payload.activities,
        loading: false,
      };
    }
    case ApiActionTypes.GET_RESPONSE_FAIL: {
      return {
        ...state,
        error: payload,
        loading: false,
      };
    }
    default:
      throw new Error(`No case found in apiResponse-reducer`);
  }
};

export default apiResponseReducer;
