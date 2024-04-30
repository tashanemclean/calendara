import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import editOptionsReducer, { EditOptionsActionTypes, EditOptionsState, initialState } from '../reducers/editOptions';

import { toStoredItemsVM } from '../utils/adapters';
import { useDropdownContext } from './dropdownItemsContext';
import { DropdownItem } from '../utils/type';

interface EditOptionsContextActions {
  modifyCity: (city: string) => void;
  modifyStateUpdate: (state: string) => void;
  modifyActivity: (activity: string[]) => void;
  modifyCategories: (categories: string[]) => void;
  onActivityChange: (activity: Record<string, DropdownItem>) => void;
  onCategoriesChange: (categories: Record<string, DropdownItem>) => void;
  submit: () => Promise<void>;
}

const initialContext: EditOptionsContextActions = {
  modifyCity: () => {},
  modifyStateUpdate: () => {},
  modifyActivity: () => null,
  modifyCategories: () => null,
  onActivityChange: () => {},
  onCategoriesChange: () => {},
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
    actions: { modify },
    state: { activitiesIds, categoriesIds },
  } = useDropdownContext();
  const activityItems = useMemo(
    () => [
      { id: '1', name: 'free', active: false },
      { id: '0', name: 'paid', active: false },
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

  const modifyActivity = (activity: string[]) => {
    dispatch({ type: EditOptionsActionTypes.UPDATE_ACTIVITY_SUCCESS, payload: activity });
  };
  const modifyCity = (city: string) => {
    dispatch({ type: EditOptionsActionTypes.UPDATE_CITY_SUCCESS, payload: city });
  };
  const modifyCategories = (categories: string[]) => {
    dispatch({ type: EditOptionsActionTypes.UPDATE_CATEGORIES_SUCCESS, payload: categories });
  };
  const modifyStateUpdate = (state: string) => {
    dispatch({ type: EditOptionsActionTypes.UPDATE_STATE_SUCCESS, payload: state });
  };

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
        modify(ids, 'activitiesIds');
        modifyActivity(ids);
      } else if (!active) {
        copy[index] = { ...item, active: true };
        const ids = toActiveIds(copy);
        modify(ids, 'activitiesIds');
        modifyActivity(ids);
      }
    },
    [dropdownActivitiesVM, modify],
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
      console.log(selected, '** selected');
      if (active) {
        copy[index] = { ...item, active: false };
        const ids = toActiveIds(copy);
        modify(ids, 'categoriesIds');
        modifyCategories(ids);
      } else if (!active) {
        copy[index] = { ...item, active: true };
        const ids = toActiveIds(copy);
        modify(ids, 'categoriesIds');
        modifyCategories(ids);
      }
    },
    [dropdownCategoriesVM, modify],
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
        modifyCity,
        modifyStateUpdate,
        onActivityChange,
      },
    }),
    [state, modifyCategories, modifyCity, modifyStateUpdate, onActivityChange, onCategoriesChange],
  );

  useEffect(() => {
    dispatch({
      type: EditOptionsActionTypes.UPDATE_STORED_DROPDOWN,
      payload: { activities: dropdownActivitiesVM, categories: dropdownCategoriesVM },
    });
  }, [dropdownActivitiesVM, dropdownCategoriesVM]);

  return <EditOptionsContext.Provider value={value}>{children}</EditOptionsContext.Provider>;
}
EditOptionsContext.displayName = 'EditOptionsContext';

export const useEditOptionsContext = () => useContext(EditOptionsContext);
