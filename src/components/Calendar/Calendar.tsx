import type { Dayjs } from 'dayjs';
import { ReactNode, useEffect, useState } from 'react';
import locale from 'dayjs/locale/en';
import dayjs from 'dayjs';
import weekdayPlugin from 'dayjs/plugin/weekday';
import objectPlugin from 'dayjs/plugin/toObject';
import isTodayPlugin from 'dayjs/plugin/isToday';

import { NextArrowIcon, PrevArrowIcon } from '../Icons';

dayjs.extend(weekdayPlugin);
dayjs.extend(objectPlugin);
dayjs.extend(isTodayPlugin);

interface WeekDates {
  dates: {
    day: number;
    month: number;
    year: number;
    isCurrentMonth: boolean;
    isCurrentDay: boolean;
  }[];
}
export const Calendar = () => {
  const now = dayjs().locale({
    ...locale,
  });

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
