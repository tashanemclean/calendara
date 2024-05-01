import { EditOptionsState } from '../reducers/editOptions';
import { DropdownItem } from './type';

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

export const fromVMToPayload = ({ dropdownItemsVM }: EditOptionsState): ApiRequestPayload => {
  const activity = dropdownItemsVM.activities.map((r) => r.id);
  const categories = dropdownItemsVM.categories.map((r) => r.id);
  console.log(dropdownItemsVM.storedDays, '** days');
  return {
    activity,
    categories,
    city: dropdownItemsVM.storedCity?.name,
    state: dropdownItemsVM.storedState?.name,
    days: dropdownItemsVM.storedDays ?? 5,
  };
};

export const fromResponsesToVM = (payload: ApiResponseRaw): ApiResponse => {
  return {
    activities: payload.Activities,
    duration: payload.Duration,
    location: payload.Location,
  };
};
