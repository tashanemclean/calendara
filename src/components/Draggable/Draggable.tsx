import { useDrag } from 'react-aria';
import styled from 'styled-components';

import { TextSM } from '../../typography';

export const Draggable = ({ text }: { text: string }) => {
  const { dragProps, isDragging } = useDrag({
    getItems() {
      return [
        {
          'text/plain': text,
        },
      ];
    },
  });

  return (
    <Container
      {...dragProps}
      role="button"
      tabIndex={0}
      $isDragging={`${isDragging ? 'dragging' : ''}`}
    >
      <TextSM.Medium>{text}</TextSM.Medium>
    </Container>
  );
};

const Container = styled.div<{ $isDragging?: string }>`
  display: inline-block;
  vertical-align: top;
  border: 1px solid gray;
  padding: 10px;
  margin-right: 20px;
  border-radius: 4px;
  opacity: ${(props) => props.$isDragging};
`;
