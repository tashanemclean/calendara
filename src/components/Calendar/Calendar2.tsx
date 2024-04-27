import dayjs, { Dayjs } from 'dayjs';
import { ReactNode, useEffect, useState } from 'react';
import locale from 'dayjs/locale/en';
import weekdayPlugin from 'dayjs/plugin/weekday';
import objectPlugin from 'dayjs/plugin/toObject';
import isTodayPlugin from 'dayjs/plugin/isToday';
import styled from 'styled-components';
import { NextArrowIcon, PrevArrowIcon } from '../Icons';

interface WeekDates {
  dates: {
    day: number;
    month: number;
    year: number;
    isCurrentMonth: boolean;
    isCurrentDay: boolean;
  }[];
}
export const Calendar2 = () => {
  const now = dayjs().locale({
    ...locale,
  });
  dayjs.extend(weekdayPlugin);
  dayjs.extend(objectPlugin);
  dayjs.extend(isTodayPlugin);
  const [currentMonth, setCurrentMonth] = useState(now);
  const [arrayOfDays, setArrayOfDays] = useState<WeekDates[]>([]);

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  const prevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const renderHeader = () => {
    const dateFormat = 'MMMM YYYY';
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div
            className="icon"
            onClick={() => prevMonth()}
          >
            <PrevArrowIcon />
          </div>
        </div>
        <div className="col col-center">
          <span>{currentMonth.format(dateFormat)}</span>
        </div>
        <div
          className="col col-end"
          onClick={() => nextMonth()}
        >
          <div className="icon">
            <NextArrowIcon />
          </div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = 'dddd';
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          className="col col-center"
        >
          {now.weekday(i).format(dateFormat)}
        </div>,
      );
    }
    return <div className="days row">{days}</div>;
  };

  const getAllDays = () => {
    let currentDate = currentMonth.startOf('month').weekday(0);
    const nextMonth = currentMonth.add(1, 'month').month();

    let allDates: WeekDates[] = [];
    let weekDates = [];

    let weekCounter = 1;

    while (currentDate.weekday(0).toObject().months !== nextMonth) {
      const formatted = formateDateObject(currentDate);

      weekDates.push(formatted);
      if (weekCounter === 7) {
        allDates.push({ dates: weekDates });
        weekDates = [];
        weekCounter = 0;
      }

      weekCounter++;
      currentDate = currentDate.add(1, 'day');
      setArrayOfDays(allDates);
    }
  };

  useEffect(() => {
    getAllDays();
  }, [currentMonth]);

  const renderCells = () => {
    const rows: ReactNode[] = [];
    let days: ReactNode[] = [];

    let i = 0;
    arrayOfDays.forEach((week, index) => {
      week.dates.forEach(({ day, isCurrentMonth, isCurrentDay }, idx) => {
        days.push(
          <div
            className={`col cell ${isCurrentDay ? 'selected' : isCurrentMonth ? '' : 'disabled'}`}
            key={`${idx}-${i++}`}
          >
            <span className="number">{day}</span>
            <span className="bg">{day}</span>
          </div>,
        );
      });
      rows.push(
        <div
          className="row"
          key={index}
        >
          {days}
        </div>,
      );
      days = [];
    });

    return <div className="body">{rows}</div>;
  };

  const formateDateObject = (date: Dayjs) => {
    const clone = { ...date.toObject() };
    const formattedObject = {
      day: clone.date,
      month: clone.months,
      year: clone.years,
      isCurrentMonth: clone.months === currentMonth.month(),
      isCurrentDay: date.isToday(),
    };

    return formattedObject;
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

// .calendar
const Container = styled.div`
  display: block;
  position: relative;
  width: 100%;
  background: var(--neutral-color);
  border: 1px solid var(--border-color);
`;

// .header
const Header = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 115%;
  padding: 1.5em 0;
  border-bottom: 1px solid var(--border-color);
`;

const Icon = styled.div`
  cursor: pointer;
  transition: 0.15s ease-out;

  &:hover {
    transform: scale(1.75);
    transition: 0.25s ease-out;
    color: var(--main-color);
  }
  &:first-of-type {
    margin-left: 1em;
  }
  &:last-of-type {
    margin-right: 1em;
  }
`;

// .days
const Days = styled.div`
  text-transform: uppercase;
  font-weight: 400;
  color: var(--text-color-light);
  font-size: 70%;
  padding: 0.75em 0;
  border-bottom: 1px solid var(--border-color);
`;

// .body
const Body = styled.div`
  font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  font-size: 1em;
  font-weight: 300;
  line-height: 1.5;
  color: var(--text-color);
  background: var(--bg-color);
  position: relative;
`;

const BodyCell = styled.div`
  position: relative;
  height: 5em;
  border-right: 1px solid var(--border-color);
  overflow: hidden;
  cursor: pointer;
  background: var(--neutral-color);
  transition: 0.25s ease-out;

  &:hover {
    background: var(--bg-color);
    transition: 0.5s ease-out;
  }
  &:last-child {
    border-right: none;
  }
`;

const BodyCellNumber = styled.span`
  position: absolute;
  font-size: 82.5%;
  line-height: 1;
  top: 0.75em;
  right: 0.75em;
  font-weight: 700;
`;

const BodyCellBackground = styled.div`
  font-weight: 700;
  line-height: 1;
  color: var(--main-color);
  opacity: 0;
  font-size: 8em;
  position: absolute;
  top: -0.2em;
  right: -0.05em;
  transition: 0.25s ease-out;
  letter-spacing: -0.07em;
`;

const BodyColumn = styled.div`
  flex-grow: 0;
  flex-basis: calc(100% / 7);
  width: calc(100% / 7);
`;

const BodyDisabled = styled.div`
  color: var(--text-color-light);
  pointer-events: none;
`;

const BodySelected = styled.div`
  border-left: 10px solid transparent;
  border-image: linear-gradient(45deg, #1a8fff 0%, #53cbf1 40%);
  border-image-slice: 1;
`;

const BodyRow = styled.div`
  border-bottom: 1px solid var(--border-color);

  &:last-child {
    border-bottom: none;
  }
`;
