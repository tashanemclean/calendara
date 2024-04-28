import { createContext, ReactNode, useCallback, useContext, useMemo, useReducer } from 'react';

import userInterfaceReducer, { initialState, UserInterfaceActionTypes, UserInterfaceState } from '../reducers/ui';

interface UserInterfaceContextActions {
  showEditOptions: () => void;
  hideEditOptions: () => void;
  lockEvents: () => void;
  unlockEvents: () => void;
}

const initialContext: UserInterfaceContextActions = {
  showEditOptions: () => null,
  hideEditOptions: () => null,
  lockEvents: () => null,
  unlockEvents: () => null,
};

export const UserInterfaceContext = createContext<{
  state: UserInterfaceState;
  actions: UserInterfaceContextActions;
}>({
  state: initialState,
  actions: initialContext,
});

export function UserInterfaceProvider({ children }: Readonly<{ children: ReactNode | ReactNode[] }>) {
  const [state, dispatch] = useReducer(userInterfaceReducer, initialState);

  const showEditOptions = useCallback(() => {
    dispatch({ type: UserInterfaceActionTypes.SHOW_EDIT_OPTIONS });
  }, []);

  const hideEditOptions = useCallback(() => {
    dispatch({ type: UserInterfaceActionTypes.HIDE_EDIT_OPTIONS });
  }, []);

  const lockEvents = useCallback(() => {
    dispatch({ type: UserInterfaceActionTypes.LOCK_EVENTS });
  }, []);

  const unlockEvents = useCallback(() => {
    dispatch({ type: UserInterfaceActionTypes.UNLOCK_EVENTS });
  }, []);

  const value = useMemo(
    () => ({
      state,
      actions: {
        ...initialContext,
        showEditOptions,
        hideEditOptions,
        lockEvents,
        unlockEvents,
      },
    }),
    [state, showEditOptions, hideEditOptions, lockEvents, unlockEvents],
  );

  return <UserInterfaceContext.Provider value={value}>{children}</UserInterfaceContext.Provider>;
}

UserInterfaceContext.displayName = 'UserInterfaceContext';
export const useUserInterface = () => useContext(UserInterfaceContext);
