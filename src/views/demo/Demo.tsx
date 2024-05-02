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
import { CategoriesCheckbox } from '../../components/Categories';
import { Button } from '../../components/Buttons';
import { City, State } from '../../services/types';
import { Spinner } from '../../components/Spinner';
import { colors } from '../../constants/colors';
import { Fade } from '../../components/Transitions/Fade';
import { DaysNumberField } from '../../components/Forms/NumberField';

export const Demo = () => {
  const {
    countryId,
    draggableData,
    editOptionsActive,
    stateId,
    storageVM: [vm],
    loading,
    onSubmit,
    onTextChange,
    handleCityChange,
    handleStateChange,
    handleDayChange,
  } = useDemo();

  const renderDraggable = () =>
    draggableData?.map((data, key) => (
      <Draggable
        key={`${data + key}`}
        text={data}
      />
    ));

  return (
    <Container>
      <Header title="Calendara" />
      <Section>
        <Panel
          panelHeight="100%"
          panelWidth="25%"
        >
          {loading && (
            <Fade enter={true}>
              <Spinner
                size="lg"
                color={colors.Mustard[500]}
              />
            </Fade>
          )}
          {!loading && (
            <>
              <EditOptions>
                <StateSelect
                  countryId={countryId}
                  onChange={handleStateChange}
                  onTextChange={onTextChange}
                  placeHolder="State"
                  defaultValue={vm.storedState as State}
                />
                <CitySelect
                  countryId={countryId}
                  stateId={stateId}
                  onChange={handleCityChange}
                  placeHolder="City"
                  defaultValue={vm.storedCity as City}
                />
                <ActivitiesCheckbox />
                <CategoriesCheckbox />
                <DaysNumberField
                  label="Days"
                  minValue={1}
                  maxValue={31}
                  onChange={handleDayChange}
                  defaultValue={vm.storedDays ?? 1}
                />
                {/* TODO: Refactor fields to use react hook form */}
                {/* <FormManager
              onSubmit={handleFind}
              render={({ control, onSubmit }) => (
                <>
                  <CheckboxField
                    items={activity}
                    control={control}
                    id="activity"
                    label="Activity"
                  />
                  <CheckboxField
                    items={categories}
                    control={control}
                    id="categories"
                    label="Categories"
                  />
                  <Button
                    onClick={onSubmit}
                    type="submit"
                    disabled={false}
                  >
                    {'Continue'}
                  </Button>
                </>
              )}
            /> */}
                <Button
                  onClick={onSubmit}
                  type="submit"
                  disabled={false}
                  style={{ marginTop: 'auto', marginLeft: '20%' }}
                >
                  Submit
                </Button>
              </EditOptions>
              {!editOptionsActive && <DraggableContainer>{renderDraggable()}</DraggableContainer>}
            </>
          )}
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

const DraggableContainer = styled.div``;
