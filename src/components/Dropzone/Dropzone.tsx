import { ReactNode, useState } from 'react';
import { DropZone, Text, TextDropItem } from 'react-aria-components';

export const Dropzone = ({ children, className }: { children: ReactNode; className?: string }) => {
  let [dropped, setDropped] = useState<string | null>(null);
  return (
    <>
      <DropZone
        className={className}
        onDrop={async (e) => {
          let items = await Promise.all(
            e.items
              .filter((item) => item.kind === 'text' && item.types.has('text/plain'))
              .map((item: TextDropItem) => item.getText('text/plain')),
          );
          setDropped(items.join('\n'));
        }}
      >
        <Text slot="label">{dropped}</Text>
        {children && children}
      </DropZone>
    </>
  );
};
