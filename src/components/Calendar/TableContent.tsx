import type { Dayjs } from 'dayjs';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { fadeIn } from '../../constants/fadeIn';
import dayjs from 'dayjs';

interface Props {
  date: Dayjs;
  smallCalendar?: boolean;
  renderDay: (day: string) => JSX.Element;
  dayTextStyle: object;
  activeDayStyle: object;
  inactiveDayStyle: object;
}

// rows represents week of month, and each column represents a day
export const TableContent = ({
  activeDayStyle,
  date,
  dayTextStyle,
  inactiveDayStyle,
  smallCalendar,
  renderDay,
}: Props) => {
  // renders the calendar days, split by weeks per calendar row
  const renderCalendar = () => {
    let currDayInMonth = dayjs(date).startOf('month');
    let endOfMonth = dayjs(date).endOf('month');
    const daysElementArray = [];
    console.log(currDayInMonth.isBefore(endOfMonth), '** is before end');
    // while (currDayInMonth.isBefore(endOfMonth)) {
    //   daysElementArray.push(<tr key={currDayInMonth.format()}>{renderByWeek(currDayInMonth)}</tr>);
    // }
    // return daysElementArray;
  };

  // currDayInMonth is an object that will be mutated by this function!
  // as we render each day, we will increment the count by 1
  const renderByWeek = (currDayInMonth: Dayjs) => {
    const currentMonth = currDayInMonth.month();

    // these change when the while loop detects the first or last day of month
    let isFirstWeek = false;
    let isLastWeek = false;

    let daysToRender = [];

    // Days rendered in a week must be at least 1, and we want to stop on the next sunday
    // Also, we want to make sure that we don't overshoot to the next month
    while ((daysToRender.length === 0 || currDayInMonth.day() % 7 !== 0) && currDayInMonth.month() <= currentMonth) {
      const isToday = currDayInMonth.diff(dayjs().startOf('day'), 'days') === 0;

      daysToRender.push(
        <TableData
          key={currDayInMonth.format('DDMMYY')}
          isToday={isToday}
          smallCalendar={smallCalendar}
          style={isToday ? activeDayStyle : inactiveDayStyle}
        >
          {renderDay(currDayInMonth.toISOString())}
          <DayNumber
            isToday={isToday}
            smallCalendar={smallCalendar}
            style={dayTextStyle}
          >
            <p>{currDayInMonth.format('D')}</p>
          </DayNumber>
        </TableData>,
      );

      // sets if the current day is the first or last week
      if (currDayInMonth.diff(dayjs(currDayInMonth).startOf('month'), 'days') === 0) {
        isFirstWeek = true;
      } else if (currDayInMonth.diff(dayjs(currDayInMonth).endOf('month'), 'days') === 0) {
        isLastWeek = true;
      }

      currDayInMonth.add(1, 'days');
    }

    if (isFirstWeek) {
      // if first week, we want to pad blank elements at the start
      for (let i = daysToRender.length; i < 7; i++) {
        daysToRender.unshift(
          <TableData
            key={currDayInMonth.format('M') + i}
            smallCalendar={smallCalendar}
            style={inactiveDayStyle}
          >
            <div />
          </TableData>,
        );
      }
    } else if (isLastWeek) {
      //if last week, we want to pad blank elements at the end
      for (let i = daysToRender.length; i < 7; i++) {
        daysToRender.push(
          <TableData
            key={currDayInMonth.format('M') + i}
            smallCalendar={smallCalendar}
            style={inactiveDayStyle}
          >
            <div />
          </TableData>,
        );
      }
    }
    return daysToRender;
  };

  return <>{renderCalendar()}</>;
};

const TableData = styled.td<{ smallCalendar?: boolean; isToday?: boolean }>`
  width: 14.28571429%;
  position: relative;
  background-color: ${(props) =>
    props.smallCalendar ? 'white' : props.isToday ? colors.lightGray : colors.veryLightGray};
  border: ${`1px solid lightgray`};
  border-width: ${(props) => (props.smallCalendar && props.isToday ? '0.1em' : '0px')};
  animation: ${fadeIn} 0.5s ease;
  box-sizing: border-box;

  :after {
    content: '';
    display: block;
    margin-top: 100%;
  }

  > * {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const DayNumber = styled.div<{ smallCalendar?: boolean; isToday?: boolean }>`
  width: 30px;
  height: 30px;
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${(props) => (props.smallCalendar ? 0 : '6% 10% 0 0')};
  left: ${(props) => (props.smallCalendar ? 'calc(50% - 14px)' : 'unset')};
  top: ${(props) => (props.smallCalendar ? 'calc(50% - 14px)' : 0)};
  right: 0;

  p {
    margin: 0;
    font-weight: ${(props) => (props.isToday ? 800 : 400)};
  }
`;
