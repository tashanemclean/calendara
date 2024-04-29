import { useCallback, useState } from 'react';
import type { DragTypes, TextDropItem } from 'react-aria-components';

import { dragTypeConstant, DropEvent, errorToastEnum } from './types';
import useCustomToast from '../../utils/useCustomToast';

const useDropzone = () => {
  const [dropped, setDropped] = useState<string[]>([]);
  const { errorToast } = useCustomToast();

  const getDropOperation = (types: DragTypes) => (types.has(dragTypeConstant.text) ? 'copy' : 'cancel');

  const onDrop = async (e: DropEvent) => {
    // short circuit if trying to add more than 5 items per cell
    if (isMaximumDropped()) {
      errorToast(errorToastEnum.maximum);
      return;
    }
    // ensure that we selected the correct elements
    const filtered = e.items.filter((item) => item.kind === 'text' && item.types.has(dragTypeConstant.text));
    const items = await Promise.all((filtered as TextDropItem[]).map((items) => items.getText(dragTypeConstant.text)));
    // ensure we include the previous elements with the new item(s) selected
    const list = [...dropped, ...items];
    setDropped(list);
  };

  const onRemove = (slot: number) => {
    // find item from dropped list
    const item = dropped.find((_, idx) => idx === slot);
    if (!item) return;
    // clone to not modify original state, and filter item selected
    const copy = [...dropped];
    // divide the copy into two parts, 0 - till element before the slot index
    // slice copy from slot index position till the end of array.
    // join result then update state
    const arr = copy.slice(0, slot).concat(copy.slice(slot + 1));
    setDropped(arr);
  };

  const truncate = (text: string) => {
    return text.length > 20 ? `${text.substring(0, 20)}...` : text;
  };

  const isMaximumDropped = useCallback(() => {
    return dropped.length > 4 ? true : false;
  }, [dropped]);

  return {
    dropped,
    getDropOperation,
    onDrop,
    onRemove,
    truncate,
  };
};

export default useDropzone;
