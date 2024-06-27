import type { NumberFieldProps, ValidationResult } from 'react-aria-components';
import { Button, FieldError, Group, Input, Label, NumberField, Text } from 'react-aria-components';
import styled from 'styled-components';

import { colors } from '../../constants/colors';
import { IconContainer } from '../../utils/common/style';

interface DaysNumberFieldProps extends NumberFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export const DaysNumberField = ({ label, description, errorMessage, ...props }: DaysNumberFieldProps) => {
  return (
    <NumberFieldContainer>
      <NumberField {...props}>
        <Label>{label}</Label>
        <Group>
          <Button
            style={{ color: colors.Black[500], fontSize: '24px' }}
            slot="decrement"
          >
            <IconContainer>-</IconContainer>
          </Button>
          <Input
            className="number-field-input bg-recipon-mustard"
            style={{ border: 'none', color: colors.Space[500] }}
          />
          <Button
            style={{ color: colors.Black[500], fontSize: '24px' }}
            slot="increment"
          >
            <IconContainer>+</IconContainer>
          </Button>
        </Group>
        {description && <Text slot="description">{description}</Text>}
        <FieldError>{errorMessage}</FieldError>
      </NumberField>
    </NumberFieldContainer>
  );
};

const NumberFieldContainer = styled.span`
  position: relative;
  display: block;
  width: max-content;
  z-index: 100;
`;
