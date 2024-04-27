import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import localeData from 'dayjs/plugin/localeData';
import weekdayPlugin from 'dayjs/plugin/weekday';
import objectPlugin from 'dayjs/plugin/toObject';
import isTodayPlugin from 'dayjs/plugin/isToday';

// configure Dayjs with extensions
// dayjs.extend(utc);
// dayjs.extend(customParseFormat);
// dayjs.extend(timezone);
// dayjs.extend(localeData);
// dayjs().localeData();

dayjs.extend(weekdayPlugin);
dayjs.extend(objectPlugin);
dayjs.extend(isTodayPlugin);

type DateFormat = string;

export const DateOnly: DateFormat = 'YYYY-MM-DD';
