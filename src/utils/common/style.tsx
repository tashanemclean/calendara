import styled from 'styled-components';

import { colors } from '../../constants/colors';
import { TextSM } from '../../typography';

export const ErrorMessageContainer = styled(TextSM.Medium)`
  min-height: 48px;
  background-color: crimson;
  border: solid 1px crimson;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  padding: 16px;
  margin: auto 0;
`;

export const IconContainer = styled.span`
  &:hover svg {
    fill: ${colors.Mustard[500]};
  }
`;
