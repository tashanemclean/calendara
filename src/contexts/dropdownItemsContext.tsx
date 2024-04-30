import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { DropdownItem } from '../utils/type';
import dropdownReducer, { DropdownActionTypes, DropdownState, initialState } from '../reducers/dropdown';
import { useLocalStorage } from '@lilib/hooks';

interface DropdownActions {
  modify: (item: string[], key: string) => void;
}

const initialContext: DropdownActions = {
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
  }>('act-cat');

  const modify = useCallback(
    (item: string[], key: string) => {
      dispatch({ type: DropdownActionTypes.UPDATE_STORED_A_ITEMS, payload: { [key]: item } });
      setPersistedItems({ ...persistedItems, [key]: item });
    },
    [persistedItems, setPersistedItems],
  );

  const value = useMemo(
    () => ({
      state,
      actions: {
        modify,
      },
    }),
    [state, modify],
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
