import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

import { GetState } from '../../../services/geo';
import { State } from '../../../services/types';
import { GeoDropdown } from './GeoDropdown';

interface Props {
  inputClassName?: string;
  onChange?: (e: State) => void;
  onTextChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: State;
  countryId: number;
  placeHolder?: string;
}

export const StateSelect = ({
  inputClassName,
  onTextChange,
  defaultValue,
  onChange,
  countryId,
  placeHolder,
}: Props) => {
  const [states, setStates] = useState<State[]>([]);
  useEffect(() => {
    if (countryId) {
      const data = GetState(countryId);
      setStates(data);
    }
  }, [countryId]);

  return (
    <InputContainer>
      <GeoDropdown
        placeHolder={placeHolder}
        options={states}
        onChange={(value) => {
          if (onChange) {
            onChange(value as State);
          }
        }}
        onTextChange={onTextChange}
        defaultValue={defaultValue}
        inputClassName={inputClassName}
      />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  position: relative;
`;
