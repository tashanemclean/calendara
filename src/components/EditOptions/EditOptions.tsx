import { MouseEvent, ReactNode, useCallback } from 'react';

import { useUserInterface } from '../../contexts/userInterfaceContext';
import { EditIcon } from '../Icons';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { IconContainer } from '../../utils/common/style';

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
        <IconContainer
          onClick={onToggle}
          style={{ cursor: 'pointer', float: 'right' }}
        >
          <EditIcon />
        </IconContainer>
      )}
      {editOptionsActive && children}
    </>
  );
};
