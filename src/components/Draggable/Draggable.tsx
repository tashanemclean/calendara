import { useDrag } from 'react-aria';
import styled from 'styled-components';

import { colors } from '../../constants/colors';
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
      <TextSM.Medium style={{ color: colors.Space[500], fontWeight: 'bold' }}>{text}</TextSM.Medium>
    </Container>
  );
};

const Container = styled.div<{ $isDragging?: string }>`
  display: inline-block;
  vertical-align: top;
  border: 1px solid gray;
  padding: 10px;
  margin: 5px;
  border-radius: 30px;
  background-color: ${colors.Mustard[500]};
  opacity: ${(props) => props.$isDragging};
`;
