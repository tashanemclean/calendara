import { useState } from 'react';
import styled from 'styled-components';

import { ActivitiesCheckbox } from '../../components/Activities';
import { Calendar } from '../../components/Calendar';
import { Draggable } from '../../components/Draggable';
import { CitySelect, StateSelect } from '../../components/Dropdown';
import { EditOptions } from '../../components/EditOptions';
import { Header } from '../../components/Header';
import { Panel } from '../../components/Panel';
import { screen } from '../../constants/screen';
import useDemo from '../../hooks/useDemo';

export const Demo = () => {
  const { draggableData, editOptionsActive } = useDemo();
  const countryId = 233;
  const [stateId, setStateId] = useState(0);
  const [cityId, setCityId] = useState(0);

  const renderDraggable = () =>
    draggableData.map((data, key) => (
      <Draggable
        key={`${data + key}`}
        text={data}
      />
    ));

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setStateId(0);
    }
    return;
  };

  return (
    <Container>
      <Header title="Calendara" />
      <Section>
        <Panel
          panelHeight="100%"
          panelWidth="25%"
        >
          <EditOptions>
            <GeoLocationContainer>
              <StateSelect
                countryId={countryId}
                inputClassName="form-control"
                onChange={(e) => {
                  setStateId(e.id);
                }}
                onTextChange={onTextChange}
                placeHolder="State"
              />
              <CitySelect
                countryId={countryId}
                stateId={stateId}
                containerClassName="form-group"
                inputClassName="form-control"
                onChange={(e) => {
                  setCityId(e.id);
                }}
                onTextChange={onTextChange}
                placeHolder="City"
              />
            </GeoLocationContainer>
            <ActivitiesCheckbox />
          </EditOptions>
          {!editOptionsActive && renderDraggable()}
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

const GeoLocationContainer = styled.span``;
