import { DropdownItem } from '../utils/type';

interface DropdownVM {
  activities: DropdownItem[];
  categories: DropdownItem[];
}
export enum EditOptionsActionTypes {
  UPDATE_CITY_INIT = 'UPDATE_CITY_INIT',
  UPDATE_CITY_SUCCESS = 'UPDATE_CITY_SUCCESS',
  UPDATE_CITY_FAIL = 'UPDATE_CITY_FAIL',
  UPDATE_STATE_INIT = 'UPDATE_STATE_INIT',
  UPDATE_STATE_SUCCESS = 'UPDATE_STATE_SUCCESS',
  UPDATE_STATE_FAIL = 'UPDATE_STATE_FAIL',
  UPDATE_ACTIVITY_INIT = 'UPDATE_ACTIVITY_INIT',
  UPDATE_ACTIVITY_SUCCESS = 'UPDATE_ACTIVITY_SUCCESS',
  UPDATE_ACTIVITY_FAIL = 'UPDATE_ACTIVITY_FAIL',
  UPDATE_CATEGORIES_FAIL = 'UPDATE_CATEGORIES_FAIL',
  UPDATE_CATEGORIES_INIT = 'UPDATE_CATEGORIES_INIT',
  UPDATE_CATEGORIES_SUCCESS = 'UPDATE_CATEGORIES_SUCCESS',
  UPDATE_ACTIVITY_DROPDOWN = 'UPDATE_ACTIVITY_DROPDOWN',
  UPDATE_CATEGORIES_DROPDOWN = 'UPDATE_CATEGORIES_DROPDOWN',
  UPDATE_STORED_DROPDOWN = 'UPDATE_STORED_DROPDOWN',
}

export interface EditOptionsState {
  city: string | null;
  state: string | null;
  categories: string[] | null;
  activity: string[] | null;
  dropdownItemsVM: DropdownVM;
  loading: boolean;
  error: string | null;
}

export const initialState: EditOptionsState = {
  city: null,
  state: null,
  categories: null,
  activity: null,
  dropdownItemsVM: { activities: [], categories: [] },
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

interface StateInitAction {
  type: EditOptionsActionTypes.UPDATE_STATE_INIT;
  payload?: void;
}

interface StateSuccessAction {
  type: EditOptionsActionTypes.UPDATE_STATE_SUCCESS;
  payload: string;
}

interface StateFailAction {
  type: EditOptionsActionTypes.UPDATE_STATE_FAIL;
  payload: string;
}

interface CityInitAction {
  type: EditOptionsActionTypes.UPDATE_CITY_INIT;
  payload?: void;
}

interface CitySuccessAction {
  type: EditOptionsActionTypes.UPDATE_CITY_SUCCESS;
  payload: string;
}

interface CityFailAction {
  type: EditOptionsActionTypes.UPDATE_CITY_FAIL;
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

interface UpdateActivityDropdownAction {
  type: EditOptionsActionTypes.UPDATE_ACTIVITY_DROPDOWN;
  payload: DropdownItem[];
}

interface UpdateCategoriesDropdownAction {
  type: EditOptionsActionTypes.UPDATE_CATEGORIES_DROPDOWN;
  payload: DropdownItem[];
}

interface UpdateStoredDropdownAction {
  type: EditOptionsActionTypes.UPDATE_STORED_DROPDOWN;
  payload: DropdownVM;
}

type EditOptionsAction =
  | ActivityInitAction
  | ActivitySuccessAction
  | ActivityFailAction
  | CityInitAction
  | CitySuccessAction
  | CityFailAction
  | CategoriesInitAction
  | CategoriesSuccessAction
  | CategoriesFailAction
  | StateInitAction
  | StateSuccessAction
  | StateFailAction
  | UpdateActivityDropdownAction
  | UpdateCategoriesDropdownAction
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
    case EditOptionsActionTypes.UPDATE_CITY_INIT: {
      return {
        ...state,
        city: null,
        loading: true,
        error: null,
      };
    }
    case EditOptionsActionTypes.UPDATE_CITY_SUCCESS: {
      return {
        ...state,
        city: payload,
        loading: false,
      };
    }
    case EditOptionsActionTypes.UPDATE_CITY_FAIL: {
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
    case EditOptionsActionTypes.UPDATE_STATE_INIT: {
      return {
        ...state,
        state: null,
        loading: true,
        error: null,
      };
    }
    case EditOptionsActionTypes.UPDATE_STATE_SUCCESS: {
      return {
        ...state,
        state: payload,
        loading: false,
      };
    }
    case EditOptionsActionTypes.UPDATE_STATE_FAIL: {
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
    case EditOptionsActionTypes.UPDATE_CATEGORIES_DROPDOWN: {
      return {
        ...state,
        loading: false,
        dropdownItemsVM: { activities: payload, categories: state.dropdownItemsVM.categories },
        error: null,
      };
    }
    case EditOptionsActionTypes.UPDATE_ACTIVITY_DROPDOWN: {
      return {
        ...state,
        loading: false,
        dropdownItemsVM: { categories: payload, activities: state.dropdownItemsVM.activities },
        error: null,
      };
    }
    default:
      throw new Error(`No case found in edit-options-reducer`);
  }
};

export default editOptionsReducer;
