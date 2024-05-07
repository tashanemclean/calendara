import { ReactNode } from 'react';
import styled from 'styled-components';

import { screen } from '../../constants/screen';

interface PanelProps {
  panelHeight?: string;
  panelWidth?: string;
  panelPadding?: string;
  children: ReactNode | ReactNode[];
  id?: string;
}

export const Panel = ({ children, panelHeight, panelWidth, panelPadding, id }: Readonly<PanelProps>) => {
  return (
    <Container
      id={id}
      $height={panelHeight}
      $width={panelWidth}
      $padding={panelPadding}
    >
      {children}
    </Container>
  );
};

const Container = styled.div<{ $width?: string; $height?: string; $padding?: string }>`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: solid 1px lightgray;
  background-color: #f9f9f9;
  padding: ${({ $padding }) => $padding || '24px'};
  height: ${({ $height }) => $height || ''};
  width: ${({ $width }) => $width || '100%'};
  box-sizing: border-box;

  @media (max-width: ${screen.mobile.max}px) {
    width: auto;
  }
  overflow: scroll;
`;
