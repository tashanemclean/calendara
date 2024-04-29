import { useState } from 'react';
import type { DragTypes, TextDropItem } from 'react-aria-components';

import { DropEvent } from './types';

const useDropzone = () => {
  const [dropped, setDropped] = useState<string[]>([]);

  const getDropOperation = (types: DragTypes) => (types.has('text/plain') ? 'copy' : 'cancel');

  const onDrop = async (e: DropEvent) => {
    // ensure that we selected the correct elements
    const filtered = e.items.filter((item) => item.kind === 'text' && item.types.has('text/plain'));
    const items = await Promise.all((filtered as TextDropItem[]).map((items) => items.getText('text/plain')));
    // ensure we include the previous elements with the new item(s) selected
    const list = [...dropped, ...items];
    setDropped(list);
  };

  const onRemove = (slot: string) => {
    // find item from dropped list
    const item = dropped.find((x) => x === slot);
    if (!item) return;
    // clone to not modify original state, and filter item selected
    const copy = [...dropped];
    const arr = copy.filter((x) => x !== item);
    setDropped(arr);
  };

  const truncate = (text: string) => {
    return text.length > 20 ? `${text.substring(0, 20)}...` : text;
  };

  return {
    dropped,
    getDropOperation,
    onDrop,
    onRemove,
    truncate,
  };
};

export default useDropzone;
