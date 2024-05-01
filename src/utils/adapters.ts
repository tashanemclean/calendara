import { flatten } from 'flat';
import { EditOptionsState } from '../reducers/editOptions';
import { City, State } from '../services/types';
import { DropdownItem } from './type';

type AdapterPayload = {
  activitiesIds: string[] | null | undefined;
  categoriesIds: string[] | null | undefined;
  storedCity: City | null | undefined;
  storedDays: number | null | undefined;
  storedState: State | null | undefined;
};
export type ApiResponseRaw = {
  Activities: any[];
  Duration: string;
  Location: string;
};

export type ApiResponse = {
  activities: any[];
  duration: string;
  location: string;
};

export type ApiRequestPayload = {
  activity: string[] | null;
  categories: string[] | null;
  city: string | undefined;
  state: string | undefined;
  days: number | undefined;
};

export const toStoredItemsVM = (storedIds: string[] | null, items: DropdownItem[]): DropdownItem[] => {
  const dropdownItems = items.map((r) => {
    const cp = storedIds?.includes(r.id);
    if (cp) {
      return { id: r.id, name: r.name, active: true };
    }
    return { id: r.id, name: r.name, active: false };
  });
  return dropdownItems;
};

export const fromVMToPayload = ({
  activitiesIds,
  categoriesIds,
  storedCity,
  storedDays,
  storedState,
}: AdapterPayload): ApiRequestPayload => {
  const activity = activitiesIds?.map((r) => r);
  const categories = categoriesIds?.map((r) => r);
  return {
    activity: activity ?? null,
    categories: categories ?? null,
    city: storedCity?.name,
    state: storedState?.name,
    days: storedDays ?? 1,
  };
};

export const fromResponsesToVM = (payload: ApiResponseRaw) => {
  return {
    activities: payload.Activities,
    duration: payload.Duration,
    location: payload.Location,
  };
};

// This function optimistically flattens the raw data result, removing the specified keys
// THe given keys will be omitted from the UI
export const toFlatDataObject = (data: ApiResponseRaw): Array<string> => {
  let arr = [];
  const raw_data = fromResponsesToVM(data);
  const flatData = flatten({ raw_data }) as object;
  for (const [key, value] of Object.entries(flatData)) {
    if (
      !key.includes('date') ??
      !key.includes('duration') ??
      !key.includes('day') ??
      !key.includes('location') ??
      !key.includes('name') ??
      !key.includes('paid') ??
      !key.includes('free') ??
      !key.includes('cost')
    ) {
      arr.push(value);
    }
  }
  return arr;
};
