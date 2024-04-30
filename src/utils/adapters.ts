import { DropdownItem } from './type';

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
