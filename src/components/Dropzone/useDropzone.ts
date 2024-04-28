import { useState } from 'react';
import type { DragTypes, TextDropItem } from 'react-aria-components';
import { DropEvent } from './types';

const useDropzone = () => {
  const [dropped, setDropped] = useState<string[]>([]);

  const getDropOperation = (types: DragTypes) => (types.has('text/plain') ? 'copy' : 'cancel');

  const onDrop = async (e: DropEvent) => {
    let items = await Promise.all(
      e.items
        .filter((item) => item.kind === 'text' && item.types.has('text/plain'))
        .map((item: TextDropItem) => item.getText('text/plain')),
    );
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

  return {
    dropped,
    getDropOperation,
    onDrop,
    onRemove,
  };
};

export default useDropzone;
