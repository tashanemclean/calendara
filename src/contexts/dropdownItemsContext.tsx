import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import dropdownReducer, {
  DropdownActionTypes,
  DropdownState,
  initialState,
  UPDATE_STORED_ITEM_TYPE,
} from '../reducers/dropdown';
import { useLocalStorage } from '@lilib/hooks';
import { City, State } from '../services/types';

interface DropdownActions {
  modify: (item: string[] | City | State, key: string, type: typeof UPDATE_STORED_ITEM_TYPE) => void;
  clear: (key: string, type: typeof UPDATE_STORED_ITEM_TYPE) => void;
}

const initialContext: DropdownActions = {
  clear: () => {},
  modify: () => {},
};

export const DropdownContext = createContext<{
  state: DropdownState;
  actions: DropdownActions;
}>({ state: initialState, actions: initialContext });

export function StoredDropdownProvider({ children }: Readonly<{ children: ReactNode | ReactNode[] }>) {
  const [state, dispatch] = useReducer(dropdownReducer, initialState);

  // Region storage init
  const [persistedItems, setPersistedItems] = useLocalStorage<{
    activitiesIds?: string[] | null;
    categoriesIds?: string[] | null;
    storedState?: State | null;
    storedCity?: City | null;
  }>('act-cat');

  const modify = useCallback(
    (item: string[] | State | City, key: string, type: typeof UPDATE_STORED_ITEM_TYPE) => {
      dispatch({ type: DropdownActionTypes[type], payload: { [key]: item } });
      setPersistedItems({ ...persistedItems, [key]: item });
    },
    [persistedItems, setPersistedItems],
  );

  const clear = (key: string, type: typeof UPDATE_STORED_ITEM_TYPE) => {
    dispatch({ type: DropdownActionTypes[type], payload: { [key]: null } });
    setPersistedItems({ ...persistedItems, [key]: null });
  };

  const value = useMemo(
    () => ({
      state,
      actions: {
        clear,
        modify,
      },
    }),
    [state, clear, modify],
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
