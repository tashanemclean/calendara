import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

import { GetCity } from '../../../services/geo';
import { City } from '../../../services/types';
import { GeoDropdown } from './GeoDropdown';

interface Props {
  containerClassName?: string;
  inputClassName?: string;
  onChange?: (e: City) => void;
  onTextChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: City;
  countryId: number;
  stateId: number;
  placeHolder?: string;
}

export const CitySelect = ({
  inputClassName,
  onTextChange,
  defaultValue,
  onChange,
  countryId,
  stateId,
  placeHolder,
}: Props) => {
  const [cities, setCities] = useState<City[]>([]);
  useEffect(() => {
    if (!stateId) {
      setCities([]);
    }
    const data = GetCity(countryId, stateId);
    setCities(data);
  }, [countryId, stateId]);

  return (
    <Container>
      <GeoDropdown
        placeHolder={placeHolder}
        options={cities}
        onChange={(value) => {
          if (onChange) {
            onChange(value as City);
          }
        }}
        onTextChange={onTextChange}
        defaultValue={defaultValue}
        inputClassName={inputClassName}
      />
    </Container>
  );
};

const Container = styled.div<{ width?: string }>`
  position: relative;
`;
