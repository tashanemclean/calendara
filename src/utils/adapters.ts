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
    days: storedDays ?? 5,
  };
};

export const fromResponsesToVM = (payload: ApiResponseRaw): ApiResponse => {
  return {
    activities: payload.Activities,
    duration: payload.Duration,
    location: payload.Location,
  };
};
