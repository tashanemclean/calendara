import { useCallback, useRef, useState } from 'react';
import { useEditOptionsContext } from '../../contexts/editOptionsContext';
import { DropdownItem } from '../../utils/type';

const useActivities = () => {
  const {
    actions: { onActivityChange },
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
    onActivityChange({ selected });
  };
  return {
    dropdownRef,
    open,
    items: dropdownItemsVM.activities,
    closeHandler,
    clickHandler,
    onUpdate,
  };
};

export default useActivities;
