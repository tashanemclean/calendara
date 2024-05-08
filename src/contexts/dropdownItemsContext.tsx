import { useLocalStorage } from '@lilib/hooks';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';

import dropdownReducer, {
  DropdownActionTypes,
  DropdownState,
  initialState,
  STORAGE_KEYS,
  UPDATE_STORED_ITEM_TYPE,
} from '../reducers/dropdown';
import { City, State } from '../services/types';

interface DropdownActions {
  modify: (item: string[] | string | number, key: string, type: typeof UPDATE_STORED_ITEM_TYPE) => void;
  modifyCity: (item: City) => void;
  modifyState: (item: State) => void;
  clear: (key: typeof STORAGE_KEYS, type: typeof UPDATE_STORED_ITEM_TYPE) => void;
}

const initialContext: DropdownActions = {
  clear: () => {},
  modify: () => {},
  modifyCity: () => {},
  modifyState: () => {},
};

export const DropdownContext = createContext<{
  state: DropdownState;
  actions: DropdownActions;
}>({ state: initialState, actions: initialContext });

export function StoredDropdownProvider({ children }: Readonly<{ children: ReactNode | ReactNode[] }>) {
  const [state, dispatch] = useReducer(dropdownReducer, initialState);

  // Region storage init
  // Get the values that are persisted in local storage
  const [persistedItems, setPersistedItems] = useLocalStorage<{
    activitiesIds?: string[] | null;
    categoriesIds?: string[] | null;
    storedState?: State | null;
    storedCity?: City | null;
    storedDays?: number | null;
  }>('act-cat');

  // Updates context state and localStorage
  const modify = useCallback(
    (item: string[] | string | number, key: string, type: typeof UPDATE_STORED_ITEM_TYPE) => {
      dispatch({ type: DropdownActionTypes[type], payload: { [key]: item } });
      setPersistedItems({ ...persistedItems, [key]: item });
    },
    [persistedItems, setPersistedItems],
  );

  const modifyCity = useCallback(
    (item: City) => {
      dispatch({ type: DropdownActionTypes.UPDATE_STORED_CITY_ITEMS, payload: { storedCity: item } });
      setPersistedItems({ ...persistedItems, storedCity: item });
    },
    [persistedItems, setPersistedItems],
  );

  const modifyState = useCallback(
    (item: State) => {
      dispatch({ type: DropdownActionTypes.UPDATE_STORED_STATE_ITEMS, payload: { storedState: item } });
      setPersistedItems({ ...persistedItems, storedState: item });
    },
    [persistedItems, setPersistedItems],
  );

  const clear = useCallback(
    (key: typeof STORAGE_KEYS, type: typeof UPDATE_STORED_ITEM_TYPE) => {
      dispatch({ type: DropdownActionTypes[type], payload: { [key]: null } });
      setPersistedItems({ ...persistedItems, [key]: null });
    },
    [persistedItems, setPersistedItems],
  );

  const value = useMemo(
    () => ({
      state,
      actions: {
        clear,
        modify,
        modifyCity,
        modifyState,
      },
    }),
    [state, clear, modify, modifyCity, modifyState],
  );

  useEffect(() => {
    if (persistedItems) {
      dispatch({ type: DropdownActionTypes.GET_STORED_DROPDOWNS_SUCCESS, payload: persistedItems });
    }
  }, [persistedItems]);

  return <DropdownContext.Provider value={value}>{children}</DropdownContext.Provider>;
}

DropdownContext.displayName = 'DropdownContext';

export const useDropdownContext = () => useContext(DropdownContext);
