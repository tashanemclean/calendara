import { City, State } from '../services/types';

export const STORAGE_KEYS: 'storedCity' | 'storedState' | 'activitiesIds' | 'categoriesIds' = 'storedCity' as const;
export const UPDATE_STORED_ITEM_TYPE:
  | 'UPDATE_STORED_A_ITEMS'
  | 'UPDATE_STORED_B_ITEMS'
  | 'UPDATE_STORED_CITY_ITEMS'
  | 'UPDATE_STORED_STATE_ITEMS' = 'UPDATE_STORED_A_ITEMS';
'UPDATE_STORED_A_ITEMS' as const;
export enum DropdownActionTypes {
  GET_STORED_DROPDOWNS_SUCCESS = 'GET_STORED_DRODOWNS_SUCCESS',
  UPDATE_STORED_A_ITEMS = 'UPDATE_STORED_A_ITEMS',
  UPDATE_STORED_B_ITEMS = 'UPDATE_STORED_B_ITEMS',
  UPDATE_STORED_CITY_ITEMS = 'UPDATE_STORED_CITY_ITEMS',
  UPDATE_STORED_STATE_ITEMS = 'UPDATE_STORED_STATE_ITEMS',
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

interface UpdateStoredCityStorageSuccess {
  type: DropdownActionTypes.UPDATE_STORED_CITY_ITEMS;
  payload: DropdownState;
}
interface UpdateStateStorageSuccess {
  type: DropdownActionTypes.UPDATE_STORED_STATE_ITEMS;
  payload: DropdownState;
}

type DropdownAction =
  | GetStorageSuccessResponse
  | UpdateStoredActivityStorageSuccess
  | UpdateCategoriesStorageSuccess
  | UpdateStoredCityStorageSuccess
  | UpdateStateStorageSuccess;

export interface DropdownState {
  activitiesIds?: string[] | null;
  categoriesIds?: string[] | null;
  storedCity?: City | null;
  storedState?: State | null;
  error?: string | null;
  loading?: boolean;
}

export const initialState: DropdownState = {
  activitiesIds: null,
  categoriesIds: null,
  storedCity: null,
  storedState: null,
  error: null,
  loading: false,
};

const dropdownReducer = (state = initialState, { type, payload }: DropdownAction): DropdownState => {
  switch (type) {
    case DropdownActionTypes.GET_STORED_DROPDOWNS_SUCCESS: {
      return {
        ...state,
        activitiesIds: payload.activitiesIds,
        categoriesIds: payload.categoriesIds,
        storedCity: payload.storedCity,
        storedState: payload.storedState,
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
    case DropdownActionTypes.UPDATE_STORED_CITY_ITEMS: {
      return {
        ...state,
        storedCity: payload.storedCity,
        loading: false,
      };
    }
    case DropdownActionTypes.UPDATE_STORED_STATE_ITEMS: {
      return {
        ...state,
        storedState: payload.storedState,
        loading: false,
      };
    }
    default:
      throw new Error(`No case found in dropdown-reducer`);
  }
};

export default dropdownReducer;
