export interface WeekDates {
  dates: {
    day: number;
    month: number;
    year: number;
    isCurrentMonth: boolean;
    isCurrentDay: boolean;
  }[];
}
