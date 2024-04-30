export enum DropdownActionTypes {
  GET_STORED_ACTIVITIES_INIT = 'GET_STORED_ACTIVITIES_INIT',
  GET_STORED_ACTIVITIES_SUCCESS = 'GET_STORED_ACTIVITIES_SUCCESS',
  GET_STORED_ACTIVITIES_FAIL = 'GET_STORED_ACTIVITIES_FAIL',
  GET_STORED_DROPDOWNS_SUCCESS = 'GET_STORED_DRODOWNS_SUCCESS',
  UPDATE_STORED_A_ITEMS = 'UPDATE_STORED_A_ITEMS',
  UPDATE_STORED_B_ITEMS = 'UPDATE_STORED_B_ITEMS',
}

interface GetStoredActionInitAction {
  type: DropdownActionTypes.GET_STORED_ACTIVITIES_INIT;
  payload?: void;
}

interface GetStoredActionFailAction {
  type: DropdownActionTypes.GET_STORED_ACTIVITIES_FAIL;
  payload: string;
}

interface GetStoredActionSuccessResponse {
  type: DropdownActionTypes.GET_STORED_ACTIVITIES_SUCCESS;
  payload: DropdownState;
}

interface GetStorageSuccessResponse {
  type: DropdownActionTypes.GET_STORED_DROPDOWNS_SUCCESS;
  payload: DropdownState;
}

interface UpdateStoredActivityStorageSuccess {
  type: DropdownActionTypes.UPDATE_STORED_A_ITEMS;
  payload: DropdownState;
}
interface UpdateCategoriesStorageSuccess {
  type: DropdownActionTypes.UPDATE_STORED_B_ITEMS;
  payload: DropdownState;
}

type DropdownAction =
  | GetStorageSuccessResponse
  | GetStoredActionInitAction
  | GetStoredActionFailAction
  | GetStoredActionSuccessResponse
  | UpdateStoredActivityStorageSuccess
  | UpdateCategoriesStorageSuccess;

export interface DropdownState {
  activitiesIds?: string[] | null;
  categoriesIds?: string[] | null;
  error?: string | null;
  loading?: boolean;
}

export const initialState: DropdownState = {
  activitiesIds: null,
  categoriesIds: null,
  error: null,
  loading: false,
};

const dropdownReducer = (state = initialState, { type, payload }: DropdownAction): DropdownState => {
  switch (type) {
    case DropdownActionTypes.GET_STORED_ACTIVITIES_INIT: {
      return {
        ...state,
        loading: true,
      };
    }
    case DropdownActionTypes.GET_STORED_ACTIVITIES_FAIL: {
      return {
        ...state,
        error: payload,
        loading: false,
      };
    }
    case DropdownActionTypes.GET_STORED_ACTIVITIES_SUCCESS: {
      return {
        ...state,
        activitiesIds: payload.activitiesIds,
        loading: false,
      };
    }
    case DropdownActionTypes.GET_STORED_DROPDOWNS_SUCCESS: {
      return {
        ...state,
        activitiesIds: payload.activitiesIds,
        categoriesIds: payload.categoriesIds,
        loading: false,
      };
    }
    case DropdownActionTypes.UPDATE_STORED_A_ITEMS: {
      return {
        ...state,
        activitiesIds: payload.activitiesIds,
        loading: false,
      };
    }
    case DropdownActionTypes.UPDATE_STORED_B_ITEMS: {
      return {
        ...state,
        categoriesIds: payload.categoriesIds,
        loading: false,
      };
    }
    default:
      throw new Error(`No case found in dropdown-reducer`);
  }
};

export default dropdownReducer;
