import styled from 'styled-components';

import { ActivitiesCheckbox } from '../../components/Activities';
import { Button } from '../../components/Buttons';
import { Calendar } from '../../components/Calendar';
import { CategoriesCheckbox } from '../../components/Categories';
import { Draggable } from '../../components/Draggable';
import { CitySelect, StateSelect } from '../../components/Dropdown';
import { EditOptions } from '../../components/EditOptions';
import { DaysNumberField } from '../../components/Forms/NumberField';
import { Header } from '../../components/Header';
import { Panel } from '../../components/Panel';
import { Spinner } from '../../components/Spinner';
import { Fade } from '../../components/Transitions/Fade';
import { colors } from '../../constants/colors';
import { screen } from '../../constants/screen';
import useDemo from '../../hooks/useDemo';
import { Fragment } from 'react';
import {
  GithubIcon,
  GoLangIcon,
  LinkedinIcon,
  NodeJsIcon,
  OpenAIICon,
  PythonIcon,
  ReactIcon,
} from '../../components/Icons';
import { TextSM } from '../../typography';

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
    draggableData?.map((data, key) => {
      // Exclude undefined keys from view
      if (data === undefined) {
        return <Fragment key={`${key++}`}></Fragment>;
      }
      return (
        <Draggable
          key={`${key++}`}
          text={data}
        />
      );
    });

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
                  defaultValue={vm.storedState!}
                />
                <CitySelect
                  countryId={countryId}
                  stateId={stateId}
                  onChange={handleCityChange}
                  placeHolder="City"
                  defaultValue={vm.storedCity!}
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
              {!editOptionsActive && !draggableData && (
                <NoDataContainer>
                  <TextSM.Medium style={{ opacity: '40%' }}> No Data, open menu and search activities</TextSM.Medium>
                </NoDataContainer>
              )}
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

      <FooterContainer>
        <AuthoredByContainer>
          <div>
            <span>Authored by:</span>
          </div>
          <LinksContainer>
            <Link
              href="https://github.com/tashanemclean"
              target="_blank"
              className="me-4 text-reset"
            >
              <GithubIcon />
            </Link>
            <Link
              href="https://www.linkedin.com/in/tashane-mclean-4a0779177/"
              target="_blank"
              className="me-4 text-reset"
            >
              <LinkedinIcon />
            </Link>
          </LinksContainer>
        </AuthoredByContainer>

        <PoweredByContainer>
          <div>
            <span>Powered by:</span>
          </div>
          <Link
            href="https://openai.com/"
            target="_blank"
          >
            <OpenAIICon />
          </Link>
          <Link
            href="https://react.dev/"
            target="_blank"
          >
            <ReactIcon />
          </Link>
          <Link
            href="https://nodejs.org/en"
            target="_blank"
          >
            <NodeJsIcon />
          </Link>
          <Link
            href="https://go.dev/"
            target="_blank"
          >
            <GoLangIcon />
          </Link>
          <Link
            href="https://www.python.org/"
            target="_blank"
          >
            <PythonIcon />
          </Link>
        </PoweredByContainer>
      </FooterContainer>
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

const AuthoredByContainer = styled.div`
  display: flex;
  align-items: center;
  line-height: 0.7;
  padding-top: 16px;
  justify-content: center;
`;
const LinksContainer = styled.div``;

const PoweredByContainer = styled.div`
  display: flex;
  align-items: center;
  line-height: 0.7;
  justify-content: center;
`;

const FooterContainer = styled.div`
  padding: 0 33px;
`;

const Link = styled.a`
  padding: 5px;
`;

const NoDataContainer = styled.div`
  position: relative;
  top: 40%;
`;
