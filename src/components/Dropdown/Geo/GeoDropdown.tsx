import { ChangeEvent } from 'react';
import styled from 'styled-components';

import { colors } from '../../../constants/colors';
import { City, Country, State } from '../../../services/types';
import { IconContainer } from '../../../utils/common/style';
import { ExpandMoreIcon } from '../../Icons';
import { TextInput } from '../../TextInput';
import { SlideIn } from '../../Transitions/SlideIn';
import { ClickOutside } from '../ClickOutside';
import useGeoDropdown from '../useGeoDropdown';

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
  const {
    inputRef,
    searchRef,
    open,
    inputStyles,
    clickHandler,
    getOptions,
    onItemClick,
    getDisplay,
    onSearch,
    handleInputClick,
  } = useGeoDropdown({ defaultValue, showFlag, options, onChange, onTextChange });

  return (
    <ClickOutside
      enabled={open}
      onClick={clickHandler}
    >
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
        <IconContainer>
          <ExpandMoreIcon />
        </IconContainer>
      </DropdownContainer>
      <SlideIn enter={open}>
        {getOptions().map((option) => (
          <div
            onClick={() => onItemClick(option)}
            key={option.id}
          >
            {showFlag && <span>{'emoji' in option ? option.emoji : ''}</span>}
            <OptionName>{option.name}</OptionName>
          </div>
        ))}
      </SlideIn>
    </ClickOutside>
  );
};

const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  padding-left: 2px;
`;

const OptionName = styled.div`
  cursor: pointer;
  color: ${colors.gray};

  &:hover {
    color: ${colors.Mustard[500]};
  }
`;
