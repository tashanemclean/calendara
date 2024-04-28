import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { screen } from '../../constants/screen';
import { ReactNode } from 'react';

interface PanelProps {
  panelHeight?: string;
  panelWidth?: string;
  children: ReactNode | ReactNode[];
}

export const Panel = ({ children, panelHeight, panelWidth }: Readonly<PanelProps>) => {
  return (
    <Container
      height={panelHeight}
      width={panelWidth}
    >
      {children}
    </Container>
  );
};

const Container = styled.div<{ width?: string; height?: string }>`
  border-radius: 8px;
  border: solid 1px lightgray;
  background-color: #f9f9f9;
  padding: 24px;
  height: ${(props) => props.height || ''};
  width: ${(props) => props.width || '100%'};
  box-sizing: border-box;

  @media (max-width: ${screen.mobile.max}px) {
    padding: 16px;
    margin: 0 16px;
    width: auto;
  }
`;
