import { useCallback, useRef, useState } from 'react';
import { DropdownItem } from '../../utils/type';
import { useEditOptionsContext } from '../../contexts/editOptionsContext';

const useCategories = () => {
  const {
    actions: { onCategoriesChange },
    state: { dropdownItemsVM },
  } = useEditOptionsContext();
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const clickHandler = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const closeHandler = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onUpdate = (selected: DropdownItem) => {
    onCategoriesChange({ selected });
  };

  return {
    open,
    dropdownRef,
    items: dropdownItemsVM.categories,
    clickHandler,
    closeHandler,
    onUpdate,
  };
};

export default useCategories;
