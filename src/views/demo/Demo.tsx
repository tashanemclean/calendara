import styled from 'styled-components';
import { screen } from '../../constants/screen';
import { Header } from '../../components/Header';
import { Panel } from '../../components/Panel';
import { Calendar } from '../../components/Calendar';

import { ActivitiesCheckbox } from '../../components/Activities';
import { EditOptions } from '../../components/EditOptions';
import { Draggable } from '../../components/Draggable';

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

const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
`;

const InputsContainer = styled.div`
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > div > p {
    margin-left: 10px;
  }
`;
