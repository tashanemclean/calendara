import { ReactNode } from 'react';

import { NextArrowIcon, PrevArrowIcon } from '../Icons';
import { Dropzone } from '../Dropzone';
import useCalendar from './useCalendar';

export const Calendar = () => {
  const { arrayOfDays, currentMonth, now, nextMonth, prevMonth } = useCalendar();

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

  const renderCells = () => {
    const rows: ReactNode[] = [];
    let days: ReactNode[] = [];

    let i = 0;
    arrayOfDays.forEach((week, index) => {
      week.dates.forEach(({ day, isCurrentMonth, isCurrentDay }, idx) => {
        days.push(
          <Dropzone
            className={`col cell ${isCurrentDay ? 'selected' : isCurrentMonth ? '' : 'disabled'}`}
            key={`${idx}-${i++}`}
          >
            <span className="number">{day}</span>
            <span className="bg">{day}</span>
          </Dropzone>,
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

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};
