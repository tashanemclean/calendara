import { ReactNode } from 'react';
import { DropZone, Text } from 'react-aria-components';
import styled from 'styled-components';
import useDropzone from './useDropzone';

export const Dropzone = ({ children, className }: { children: ReactNode; className?: string }) => {
  const { dropped, getDropOperation, onDrop, onRemove } = useDropzone();

  const renderDropped = () => (
    <DroppedItemContainer>
      {dropped?.map((item, key) => (
        <Text
          slot={`${key}`}
          key={`${key}-${item}`}
        >
          {item}
          <span onClick={() => onRemove(item)}>X</span>
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
