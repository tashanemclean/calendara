import { City, State } from '../services/types';
import { DropdownItem } from '../utils/type';

interface DropdownVM {
  activities: DropdownItem[];
  categories: DropdownItem[];
  storedState?: State | null;
  storedCity?: City | null;
  storedDays?: number | null;
}
export enum EditOptionsActionTypes {
  UPDATE_ACTIVITY_INIT = 'UPDATE_ACTIVITY_INIT',
  UPDATE_ACTIVITY_SUCCESS = 'UPDATE_ACTIVITY_SUCCESS',
  UPDATE_ACTIVITY_FAIL = 'UPDATE_ACTIVITY_FAIL',
  UPDATE_CATEGORIES_FAIL = 'UPDATE_CATEGORIES_FAIL',
  UPDATE_CATEGORIES_INIT = 'UPDATE_CATEGORIES_INIT',
  UPDATE_CATEGORIES_SUCCESS = 'UPDATE_CATEGORIES_SUCCESS',
  UPDATE_STORED_DROPDOWN = 'UPDATE_STORED_DROPDOWN',
}

export interface EditOptionsState {
  categories: string[] | null;
  activity: string[] | null;
  dropdownItemsVM: DropdownVM;
  loading: boolean;
  error: string | null;
}

export const initialState: EditOptionsState = {
  categories: null,
  activity: null,
  dropdownItemsVM: { activities: [], categories: [], storedState: null, storedDays: null, storedCity: null },
  loading: false,
  error: null,
};

interface ActivityInitAction {
  type: EditOptionsActionTypes.UPDATE_ACTIVITY_INIT;
  payload?: void;
}

interface ActivitySuccessAction {
  type: EditOptionsActionTypes.UPDATE_ACTIVITY_SUCCESS;
  payload: string[];
}

interface ActivityFailAction {
  type: EditOptionsActionTypes.UPDATE_ACTIVITY_FAIL;
  payload: string;
}

interface CategoriesInitAction {
  type: EditOptionsActionTypes.UPDATE_CATEGORIES_INIT;
  payload?: void;
}

interface CategoriesSuccessAction {
  type: EditOptionsActionTypes.UPDATE_CATEGORIES_SUCCESS;
  payload: string[];
}

interface CategoriesFailAction {
  type: EditOptionsActionTypes.UPDATE_CATEGORIES_FAIL;
  payload: string;
}

interface UpdateStoredDropdownAction {
  type: EditOptionsActionTypes.UPDATE_STORED_DROPDOWN;
  payload: DropdownVM;
}

type EditOptionsAction =
  | ActivityInitAction
  | ActivitySuccessAction
  | ActivityFailAction
  | CategoriesInitAction
  | CategoriesSuccessAction
  | CategoriesFailAction
  | UpdateStoredDropdownAction;

const editOptionsReducer = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  { type, payload }: EditOptionsAction,
): EditOptionsState => {
  switch (type) {
    case EditOptionsActionTypes.UPDATE_ACTIVITY_INIT: {
      return {
        ...state,
        activity: null,
        loading: true,
        error: null,
      };
    }
    case EditOptionsActionTypes.UPDATE_ACTIVITY_SUCCESS: {
      return {
        ...state,
        activity: payload,
        loading: false,
      };
    }
    case EditOptionsActionTypes.UPDATE_ACTIVITY_FAIL: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    case EditOptionsActionTypes.UPDATE_CATEGORIES_INIT: {
      return {
        ...state,
        categories: null,
        loading: true,
        error: null,
      };
    }
    case EditOptionsActionTypes.UPDATE_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: payload,
        loading: false,
      };
    }
    case EditOptionsActionTypes.UPDATE_CATEGORIES_FAIL: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    case EditOptionsActionTypes.UPDATE_STORED_DROPDOWN: {
      return {
        ...state,
        loading: false,
        dropdownItemsVM: payload,
        error: null,
      };
    }
    default:
      throw new Error(`No case found in edit-options-reducer`);
  }
};

export default editOptionsReducer;
