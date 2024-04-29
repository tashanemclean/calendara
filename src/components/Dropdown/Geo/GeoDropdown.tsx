import { ChangeEvent, CSSProperties } from 'react';

import { City, Country, State } from '../../../services/types';
import useGeoDropdown from '../useGeoDropdown';
import { TextInput } from '../../TextInput';
import { ExpandMoreIcon } from '../../Icons';
import styled from 'styled-components';
import { SlideIn } from '../../Transitions/SlideIn';

interface Props {
  placeHolder?: string;
  options: (Country | State | City)[];
  inputClassName?: string;
  onTextChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: Country | State | City;
  onChange: (e: Country | State | City) => void;
  showFlag?: boolean;
}

export const GeoDropdown = ({ placeHolder, options, onChange, onTextChange, defaultValue, showFlag = true }: Props) => {
  const { inputRef, searchRef, open, inputStyles, getOptions, onItemClick, getDisplay, onSearch, handleInputClick } =
    useGeoDropdown({ defaultValue, showFlag, options, onChange, onTextChange });

  return (
    <>
      <DropdownContainer
        ref={inputRef}
        onClick={handleInputClick}
      >
        <TextInput
          onChange={onSearch}
          value={getDisplay()}
          placeholder={placeHolder}
          ref={searchRef}
          width={'50%'}
          style={inputStyles}
        />
        <ExpandMoreIcon />
      </DropdownContainer>
      {open && (
        <SlideIn enter={open}>
          {getOptions().map((option) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.id}
            >
              {showFlag && <span>{'emoji' in option ? option.emoji : ''}</span>}
              <span style={{ cursor: 'pointer' }}>{option.name}</span>
            </div>
          ))}
        </SlideIn>
      )}
    </>
  );
};

const DropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  padding-left: 2px;
`;
