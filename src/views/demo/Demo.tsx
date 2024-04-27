import styled from 'styled-components';
import { screen } from '../../constants/screen';
import { Header } from '../../components/Header';
import { Panel } from '../../components/Panel';
import { Calendar } from '../../components/Calendar';
import { useState } from 'react';
import dayjs from 'dayjs';
import { colors } from '../../constants/colors';
import { Calendar2 } from '../../components/Calendar/Calendar2';

export const Demo = () => {
  const [showDefaultStyles, setShowDefaultStyles] = useState(true);
  const [showSampleEvents, setShowSampleEvents] = useState(false);

  const handleShowDefaultStyleChange = (e) => {
    setShowDefaultStyles(e.target.checked);
  };

  const handleShowSampleEventsChange = (e) => {
    setShowSampleEvents(e.target.checked);
  };

  const renderDay = (day: string) => {
    const isSmallCalendar = false;
    if (!isSmallCalendar) {
      const date = dayjs(day);
      const diff = date.diff(dayjs().startOf('day'));
      if (diff === -259200000 || diff === 259200000) {
        return (
          <div
            style={{
              boxSizing: 'border-box',
              height: '100%',
              width: '100%',
              backgroundImage: 'url(https://farm2.staticflickr.com/1203/1475793643_d911a66735_m.jpg)',
              backgroundSize: 'cover',
              borderRadius: showDefaultStyles ? 0 : '10%',
            }}
          />
        );
      }
    }
    return (
      <div
        style={{
          boxSizing: 'border-box',
          height: '100%',
          width: '100%',
          backgroundImage: 'url(https://farm2.staticflickr.com/1203/1475793643_d911a66735_m.jpg)',
          backgroundSize: 'cover',
          borderRadius: showDefaultStyles ? 0 : '10%',
        }}
      />
    );
  };

  return (
    <Container>
      <Header title="Calendara" />
      <Section>
        <Panel
          panelHeight="100%"
          panelWidth="25%"
        >
          <>Interaction panel</>
        </Panel>
        <Panel
          panelHeight="100%"
          panelWidth="75%"
        >
          {/* <Calendar
            onMonthChange={(x) => console.log(x)}
            style={showDefaultStyles ? {} : { backgroundColor: '#222222', borderRadius: 10 }}
            renderDay={renderDay}
            titleTextStyle={showDefaultStyles ? {} : { color: 'white' }}
            dayNameTextStyle={showDefaultStyles ? {} : { color: colors.lightGray }}
            dayTextStyle={showDefaultStyles ? {} : { fontFamily: 'serif', color: 'white', borderRadius: '25%' }}
            activeDayStyle={showDefaultStyles ? {} : { borderRadius: '10%', backgroundColor: '#314056' }}
            inactiveDayStyle={showDefaultStyles ? {} : { borderRadius: '10%', backgroundColor: '#333333' }}
          /> */}
          <Calendar2 />
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
