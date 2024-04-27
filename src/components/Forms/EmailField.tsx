import type { Control, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';

import { TextMD } from '../../typography';

import { TextInput } from '../TextInput/TextInput';
import { ErrorMessageContainer } from '../../utils/common/style';

interface EmailFieldProps {
  control: Control<FieldValues, unknown>;
  errorMessage?: string;
  id: string;
  isRequired?: boolean;
  label: string;
  placeholder?: string;
  value?: string;
  containerWidth?: string;
}
export const EmailField = ({
  control,
  // errorMessage = 'Enter a valid email',
  id,
  isRequired,
  label,
  value,
  placeholder,
  containerWidth,
}: EmailFieldProps) => (
  <Controller
    control={control}
    defaultValue={value ?? ''}
    name={id}
    rules={{
      required: isRequired,
    }}
    render={({ field, fieldState: { error } }) => (
      <FieldContainer>
        <TextMD.Medium>
          <strong>{label}</strong>
        </TextMD.Medium>
        <TextInput
          {...field}
          placeholder={placeholder}
          containerWidth={containerWidth}
        />
        {error && <ErrorMessageContainer>{error.message}</ErrorMessageContainer>}
      </FieldContainer>
    )}
  />
);
const FieldContainer = styled.div`
  width: 100%;
`;
