import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { SMALL_CALENDAR_WIDTH } from '../../constants/fadeIn';
import { useMount, useUnmount } from '@lilib/hooks';
import { TopBar } from './TopBar';
import { TableContent } from './TableContent';
import { TableHeader } from './TableHeader';

interface Props {
  activeDayStyle: object;
  dayNameTextStyle: object;
  dayTextStyle: object;
  style: object;
  titleTextStyle: object;
  inactiveDayStyle: object;
  width: string;
  onMonthChange: (date: string) => {};
  // renderDay is a callback, which allows custom rendering of the given date onto the div
  // render day is called with a parameter for ISO-8601 string of the current day
  renderDay: (date: string) => JSX.Element;
}
export const Calendar = ({
  activeDayStyle,
  dayNameTextStyle,
  dayTextStyle,
  style,
  titleTextStyle,
  inactiveDayStyle,
  width,
  onMonthChange,
  renderDay,
}: Props) => {
  const [smallCalendar, setSmallCalendar] = useState<boolean>();

  const [dateRange, setDate] = useState<{ date: Dayjs; smallCalendar?: boolean }>({
    date: dayjs().startOf('month'), // always set moment to the start of the month (days don't matter)
    smallCalendar: false, // detects if the calendar should be rendered with the small calendar style
  });

  const handleWindowResize = () => {
    if (!smallCalendar) {
      setSmallCalendar(true);
    } else if (smallCalendar) {
      setSmallCalendar(false);
    }
  };

  useMount(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    onMonthChange(dayjs(dateRange.date).startOf('month').toISOString());
  });

  useUnmount(() => {
    window.removeEventListener('resize', handleWindowResize);
  });

  const handleMonthChange = (months: number) => {
    const newDate = dateRange.date.add(months);
    setDate({ date: newDate });
  };

  return (
    <Container
      style={style}
      width={width}
    >
      <TopBar
        date={dateRange.date}
        onPrevClick={() => handleMonthChange(-1)}
        onNextClick={() => handleMonthChange(1)}
        titleTextStyle={titleTextStyle}
      />
      <Table>
        <tbody>
          <TableHeader dayNameTextStyle={dayNameTextStyle} />
          <TableContent
            date={dateRange.date}
            smallCalendar={dateRange.smallCalendar}
            renderDay={renderDay}
            dayTextStyle={dayTextStyle}
            activeDayStyle={activeDayStyle}
            inactiveDayStyle={inactiveDayStyle}
          />
        </tbody>
      </Table>
    </Container>
  );
};

const Container = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width || '90%'};
  max-width: 1000px;
  min-width: 300px;
  padding: 1%;
  box-sizing: border-box;
`;

const Table = styled.table`
  width: 100%;
  color: ${colors.gray};
  border-spacing: 4px;
`;
