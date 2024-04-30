import { EditOptionsState } from '../reducers/editOptions';
import { DropdownItem } from './type';

export type ApiRequestPayload = {
  activity: string[] | null;
  categories: string[] | null;
  city: number | undefined;
  state: number | undefined;
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

export const fromVMToPayload = ({ dropdownItemsVM, activity, categories }: EditOptionsState): ApiRequestPayload => {
  return {
    activity,
    categories,
    city: dropdownItemsVM.storedCity?.id,
    state: dropdownItemsVM.storedState?.id,
  };
};
