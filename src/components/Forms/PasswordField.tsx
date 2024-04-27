import { useMemo, useState } from 'react';
import type { Control, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';

import { TextMD } from '../../typography';
// import { EyeClosedIcon, EyeOpenIcon } from '../Icons';
import { TextInput } from '../TextInput';

interface EmailFieldProps {
  control: Control<FieldValues, unknown>;
  errorMessage?: string;
  id: string;
  isRequired?: boolean;
  label: string;
  placeholder: string;
  value?: string;
}

const ToggleButton = ({ icon, onClick }: { icon: JSX.Element; onClick: () => void }) => (
  <EyeIconContainer onClick={onClick}>{icon}</EyeIconContainer>
);

export const PasswordField = ({ control, id, isRequired, label, placeholder, value }: EmailFieldProps) => {
  const [isPasswordInput, setIsPasswordInput] = useState<boolean>(true);

  const { icon, inputType } = useMemo<{
    icon: JSX.Element;
    inputType: 'password' | 'text';
  }>(
    () => ({
      icon: isPasswordInput ? (
        // TODO define close eye icon
        <></>
      ) : (
        <span>
          {/* TODO define open eye icon */}
          <></>
        </span>
      ),
      inputType: isPasswordInput ? 'password' : 'text',
    }),
    [isPasswordInput],
  );

  const handleTypeToggle = () => setIsPasswordInput((prev) => !prev);

  return (
    <Controller
      control={control}
      defaultValue={value ?? ''}
      name={id}
      rules={{
        required: isRequired,
      }}
      render={({ field }) => (
        <FieldContainer>
          <TextMD.Medium>
            <strong>{label}</strong>
          </TextMD.Medium>
          <InputContainer>
            <TextInput
              {...field}
              placeholder={placeholder}
              type={inputType}
              suffixIcon={
                <ToggleButton
                  icon={icon}
                  onClick={handleTypeToggle}
                />
              }
              containerWidth="100%"
            />
          </InputContainer>
        </FieldContainer>
      )}
    />
  );
};
const FieldContainer = styled.div`
  width: 100%;
`;

const InputContainer = styled.div`
  position: relative;
`;

const EyeIconContainer = styled.span`
  padding-top: 5px;
  position: absolute;
  box-sizing: border-box;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;
