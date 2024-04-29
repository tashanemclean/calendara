import { ReactNode } from 'react';
import { DropZone, Text } from 'react-aria-components';
import styled from 'styled-components';

import useDropzone from './useDropzone';
import { XIcon } from '../Icons';

export const Dropzone = ({ children, className }: { children: ReactNode; className?: string }) => {
  const { dropped, getDropOperation, onDrop, onRemove, truncate } = useDropzone();

  const renderDropped = () => (
    <DroppedItemContainer>
      {dropped?.map((item, key) => (
        <Text
          slot={`${key}`}
          key={`${item + key}`}
          className="dropped-item"
        >
          {truncate(item)}
          <XIcon onClick={() => onRemove(item)} />
        </Text>
      ))}
    </DroppedItemContainer>
  );

  return (
    <>
      <DropZone
        className={className}
        getDropOperation={getDropOperation}
        onDrop={onDrop}
      >
        {renderDropped()}
        {children && children}
      </DropZone>
    </>
  );
};

const DroppedItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
