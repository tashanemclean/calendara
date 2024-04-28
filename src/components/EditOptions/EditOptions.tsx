import { MouseEvent, ReactNode, useCallback } from 'react';
import { useUserInterface } from '../../contexts/userInterfaceContext';
import { EditIcon } from '../Icons';

export const EditOptions = ({ children }: { children: ReactNode }) => {
  const {
    actions: { hideEditOptions, showEditOptions, unlockEvents },
    state: { editOptionsActive },
  } = useUserInterface();

  const onShowOptions = useCallback(() => {
    showEditOptions();
  }, [showEditOptions]);

  const onCloseOptions = useCallback(() => {
    hideEditOptions();
  }, [hideEditOptions]);

  const onToggle = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    unlockEvents();
    return !editOptionsActive ? onShowOptions() : onCloseOptions();
  };

  return (
    <>
      {!editOptionsActive && (
        <span
          onClick={onToggle}
          style={{ cursor: 'pointer', float: 'right' }}
        >
          <EditIcon />
        </span>
      )}
      {editOptionsActive && children}
    </>
  );
};
