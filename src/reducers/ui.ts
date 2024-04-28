export enum UserInterfaceActionTypes {
  SHOW_EDIT_OPTIONS = 'SHOW_EDIT_OPTIONS',
  HIDE_EDIT_OPTIONS = 'HIDE_EDIT_OPTIONS',
  LOCK_EVENTS = 'LOCK_EVENTS',
  UNLOCK_EVENTS = 'UNLOCK_EVENTS',
}

export interface UserInterfaceState {
  editOptionsActive: boolean;
  eventsLocked: boolean;
}

export const initialState: UserInterfaceState = {
  editOptionsActive: false,
  eventsLocked: false,
};

interface ShowEditOptionsAction {
  type: UserInterfaceActionTypes.SHOW_EDIT_OPTIONS;
  payload?: void;
}

interface HideEditOptionsAction {
  type: UserInterfaceActionTypes.HIDE_EDIT_OPTIONS;
  payload?: void;
}

interface LockEventsAction {
  type: UserInterfaceActionTypes.LOCK_EVENTS;
  payload?: void;
}

interface UnlockEventsAction {
  type: UserInterfaceActionTypes.UNLOCK_EVENTS;
  payload?: void;
}
type UserInterfaceAction = ShowEditOptionsAction | HideEditOptionsAction | LockEventsAction | UnlockEventsAction;

const userInterfaceReducer = (state = initialState, { type }: UserInterfaceAction): UserInterfaceState => {
  switch (type) {
    case UserInterfaceActionTypes.SHOW_EDIT_OPTIONS: {
      return {
        ...state,
        editOptionsActive: true,
      };
    }
    case UserInterfaceActionTypes.HIDE_EDIT_OPTIONS: {
      return {
        ...state,
        editOptionsActive: false,
      };
    }
    case UserInterfaceActionTypes.LOCK_EVENTS: {
      return {
        ...state,
        eventsLocked: true,
      };
    }
    case UserInterfaceActionTypes.UNLOCK_EVENTS: {
      return {
        ...state,
        eventsLocked: false,
      };
    }
    default:
      throw new Error(`No case found in ui-reducer`);
  }
};

export default userInterfaceReducer;
