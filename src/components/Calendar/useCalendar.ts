import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/en';
import { useEffect, useState } from 'react';
import weekdayPlugin from 'dayjs/plugin/weekday';
import objectPlugin from 'dayjs/plugin/toObject';
import isTodayPlugin from 'dayjs/plugin/isToday';
import { WeekDates } from './types';

dayjs.extend(weekdayPlugin);
dayjs.extend(objectPlugin);
dayjs.extend(isTodayPlugin);

const useCalendar = () => {
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

  return {
    arrayOfDays,
    currentMonth,
    now,
    getAllDays,
    nextMonth,
    prevMonth,
  };
};

export default useCalendar;
