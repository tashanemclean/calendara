import styled from 'styled-components';

import { ActivitiesCheckbox } from '../../components/Activities';
import { Calendar } from '../../components/Calendar';
import { Draggable } from '../../components/Draggable';
import { EditOptions } from '../../components/EditOptions';
import { Header } from '../../components/Header';
import { Panel } from '../../components/Panel';
import { screen } from '../../constants/screen';

export const Demo = () => {
  return (
    <Container>
      <Header title="Calendara" />
      <Section>
        <Panel
          panelHeight="100%"
          panelWidth="25%"
        >
          <EditOptions>
            <ActivitiesCheckbox />
          </EditOptions>
          <Draggable text="Drag me" />
          <Draggable text="Drag me 2" />
        </Panel>
        <Panel
          panelHeight="100%"
          panelWidth="75%"
          panelPadding="0px"
        >
          <Calendar />
        </Panel>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  display: block;
  height: 100vh;
  overflow-y: auto;

  @media (max-width: ${screen.mobile.max}px) {
    width: 100vw;
    padding-bottom: 16px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: 0px;
  box-sizing: border-box;
  height: 80vh;

  @media (max-width: ${screen.mobile.max}px) {
    flex-grow: unset;
    width: 100vw;
    display: flex;
    flex-direction: column;
  }
`;
