import { ChangeEvent, useEffect, useState } from 'react';

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
  containerClassName,
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
    if (countryId) {
      const data = GetCity(countryId, stateId);
      setCities(data);
    }
  }, [countryId, stateId]);

  return (
    <>
      <div
        className={containerClassName}
        style={{ position: 'relative' }}
      >
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
      </div>
    </>
  );
};
