import { MouseEvent, ReactNode, useCallback } from 'react';

import { useUserInterface } from '../../contexts/userInterfaceContext';
import { IconContainer } from '../../utils/common/style';
import { BackArrowIcon, EditIcon } from '../Icons';

export const EditOptions = ({ children }: { children: ReactNode }) => {
  const {
    actions: { hideEditOptions, showEditOptions, unlockEvents },
    state: { editOptionsActive },
  } = useUserInterface();

  // Menu open Abstraction to isolate opening menu
  const onShowOptions = useCallback(() => {
    showEditOptions();
  }, [showEditOptions]);

  // Menu open Abstraction to isolate opening menu
  const onCloseOptions = useCallback(() => {
    hideEditOptions();
  }, [hideEditOptions]);

  // Show / hide for opening and closing menu
  // Events are logged by default UI context, we call open to allow toggling of UI
  const onToggle = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    unlockEvents();
    return !editOptionsActive ? onShowOptions() : onCloseOptions();
  };

  return (
    <>
      {!editOptionsActive && (
        <IconContainer
          onClick={onToggle}
          style={{ cursor: 'pointer', marginLeft: 'auto' }}
        >
          <EditIcon />
        </IconContainer>
      )}
      {editOptionsActive && (
        <>
          <IconContainer
            onClick={onToggle}
            style={{ cursor: 'pointer', marginRight: 'auto' }}
          >
            <BackArrowIcon />
          </IconContainer>
          {children}
        </>
      )}
    </>
  );
};
