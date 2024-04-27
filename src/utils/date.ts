import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import localeData from 'dayjs/plugin/localeData';

// configure Dayjs with extensions
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);
dayjs.extend(localeData);
dayjs().localeData();

type DateFormat = string;

export const DateOnly: DateFormat = 'YYYY-MM-DD';
