import { ChangeEvent } from 'react';

import { City, Country, State } from '../../../services/types';
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

const Icon = () => {
  return (
    <svg
      height="20"
      width="20"
      viewBox="0 0 20 20"
    >
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

export const GeoDropdown = ({
  placeHolder,
  options,
  onChange,
  inputClassName,
  onTextChange,
  defaultValue,
  showFlag = true,
}: Props) => {
  const { inputRef, searchRef, showMenu, getOptions, onItemClick, isSelected, getDisplay, onSearch, handleInputClick } =
    useGeoDropdown({ defaultValue, showFlag, options, onChange, onTextChange });

  return (
    <div className={'stdropdown-container'}>
      <div
        ref={inputRef}
        onClick={handleInputClick}
        className={'stdropdown-input stsearch-box'}
      >
        <input
          className={inputClassName}
          onChange={onSearch}
          value={getDisplay()}
          placeholder={placeHolder}
          ref={searchRef}
        />
        <div className={'stdropdown-tools'}>
          <div className={'stdropdown-tool'}>
            <Icon />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className={'stdropdown-menu'}>
          {getOptions().map((option) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.id}
              className={`${'stdropdown-item'} ${isSelected(option) && 'selected'}`}
            >
              {showFlag && <span>{'emoji' in option ? option.emoji : ''}</span>} {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
