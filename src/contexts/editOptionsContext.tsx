import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';

import editOptionsReducer, { EditOptionsActionTypes, EditOptionsState, initialState } from '../reducers/editOptions';
import { City, State } from '../services/types';
import { toStoredItemsVM } from '../utils/adapters';
import { DropdownItem } from '../utils/type';
import { useDropdownContext } from './dropdownItemsContext';

interface EditOptionsContextActions {
  modifyActivity: (activity: string[]) => void;
  modifyCategories: (categories: string[]) => void;
  modifyDays: (days: number) => void;
  onActivityChange: (activity: Record<string, DropdownItem>) => void;
  onCategoriesChange: (categories: Record<string, DropdownItem>) => void;
  onCityChange: (city: City) => void;
  onStateChange: (state: State) => void;
  submit: () => Promise<void>;
}

const initialContext: EditOptionsContextActions = {
  modifyActivity: () => null,
  modifyCategories: () => null,
  modifyDays: () => null,
  onActivityChange: () => {},
  onCategoriesChange: () => {},
  onCityChange: () => {},
  onStateChange: () => {},
  submit: async () => {},
};

export const EditOptionsContext = createContext<{
  state: EditOptionsState;
  actions: EditOptionsContextActions;
}>({
  state: initialState,
  actions: initialContext,
});

export function EditOptionsProvider({ children }: Readonly<{ children: ReactNode | ReactNode[] }>) {
  const [state, dispatch] = useReducer(editOptionsReducer, initialState);
  const {
    actions: { modify, modifyCity, modifyState },
    state: { activitiesIds, categoriesIds, storedCity, storedDays, storedState },
  } = useDropdownContext();
  const activityItems = useMemo(
    () => [
      { id: '0', name: 'free', active: false },
      { id: '1', name: 'paid', active: false },
    ],
    [],
  );
  const categoriesItems = useMemo(
    () => [
      { id: '0', name: 'hiking', active: false },
      { id: '1', name: 'fishing', active: false },
      { id: '2', name: 'basketball', active: false },
      { id: '3', name: 'swimming', active: false },
      { id: '4', name: 'walking', active: false },
      { id: '5', name: 'aquarium', active: false },
      { id: '6', name: 'other', active: false },
    ],
    [],
  );

  const dropdownActivitiesVM = useMemo(
    () => toStoredItemsVM(activitiesIds ?? [], activityItems),
    [activityItems, activitiesIds],
  );

  const dropdownCategoriesVM = useMemo(
    () => toStoredItemsVM(categoriesIds ?? [], categoriesItems),
    [categoriesItems, categoriesIds],
  );

  const modifyActivity = useCallback((activity: string[]) => {
    dispatch({ type: EditOptionsActionTypes.UPDATE_ACTIVITY_SUCCESS, payload: activity });
  }, []);

  const modifyCategories = useCallback((categories: string[]) => {
    dispatch({ type: EditOptionsActionTypes.UPDATE_CATEGORIES_SUCCESS, payload: categories });
  }, []);

  const modifyDays = useCallback(
    (days: number) => {
      modify(days, 'storedDays', 'UPDATE_STORED_DAY_ITEMS');
    },
    [modify],
  );
  const onActivityChange = useCallback(
    ({ selected }: Record<string, DropdownItem>) => {
      dispatch({ type: EditOptionsActionTypes.UPDATE_ACTIVITY_INIT });
      // get key
      const { active, id } = selected;
      // find item from activities list
      const item = dropdownActivitiesVM.find((x) => x.id === id);
      if (!item) return;
      const copy = [...(dropdownActivitiesVM ?? [])];
      const index = copy.findIndex((x) => x === item);
      if (active) {
        copy[index] = { ...item, active: false };
        const ids = toActiveIds(copy);
        modify(ids, 'activitiesIds', 'UPDATE_STORED_A_ITEMS');
        modifyActivity(ids);
      } else if (!active) {
        copy[index] = { ...item, active: true };
        const ids = toActiveIds(copy);
        modify(ids, 'activitiesIds', 'UPDATE_STORED_A_ITEMS');
        modifyActivity(ids);
      }
    },
    [dropdownActivitiesVM, modify, modifyActivity],
  );

  const onCityChange = useCallback(
    (city: City) => {
      modifyCity(city);
    },
    [modifyCity],
  );

  const onStateChange = useCallback(
    (state: State) => {
      modifyState(state);
    },
    [modifyState],
  );

  const onCategoriesChange = useCallback(
    ({ selected }: Record<string, DropdownItem>) => {
      dispatch({ type: EditOptionsActionTypes.UPDATE_CATEGORIES_INIT });
      // get key
      const { active, id } = selected;
      // find item from activities list
      const item = dropdownCategoriesVM.find((x) => x.id === id);
      if (!item) return;
      const copy = [...(dropdownCategoriesVM ?? [])];
      const index = copy.findIndex((x) => x === item);
      if (active) {
        copy[index] = { ...item, active: false };
        const ids = toActiveIds(copy);
        modify(ids, 'categoriesIds', 'UPDATE_STORED_B_ITEMS');
        modifyCategories(ids);
      } else if (!active) {
        copy[index] = { ...item, active: true };
        const ids = toActiveIds(copy);
        modify(ids, 'categoriesIds', 'UPDATE_STORED_B_ITEMS');
        modifyCategories(ids);
      }
    },
    [dropdownCategoriesVM, modify, modifyCategories],
  );

  const toActiveIds = (items: DropdownItem[]) => {
    const active = items.filter((r) => r.active === true);
    return active.map((r) => r.id);
  };

  const value = useMemo(
    () => ({
      state,
      actions: {
        ...initialContext,
        modifyActivity,
        modifyCategories,
        onActivityChange,
        onCategoriesChange,
        onCityChange,
        onStateChange,
        modifyDays,
      },
    }),
    [
      state,
      modifyActivity,
      modifyCategories,
      onActivityChange,
      onCategoriesChange,
      onCityChange,
      onStateChange,
      modifyDays,
    ],
  );

  useEffect(() => {
    dispatch({
      type: EditOptionsActionTypes.UPDATE_STORED_DROPDOWN,
      payload: {
        activities: dropdownActivitiesVM,
        categories: dropdownCategoriesVM,
        storedState,
        storedCity,
        storedDays,
      },
    });
  }, [dropdownActivitiesVM, dropdownCategoriesVM, storedCity, storedState, storedDays]);

  return <EditOptionsContext.Provider value={value}>{children}</EditOptionsContext.Provider>;
}
EditOptionsContext.displayName = 'EditOptionsContext';

export const useEditOptionsContext = () => useContext(EditOptionsContext);
