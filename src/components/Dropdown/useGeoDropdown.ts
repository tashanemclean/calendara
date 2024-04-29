import { ChangeEvent, CSSProperties, useCallback, useEffect, useRef, useState } from 'react';

import { City, Country, State } from '../../services/types';
import { colors } from '../../constants/colors';

interface Props {
  defaultValue?: Country | State | City;
  showFlag?: boolean;
  options: (Country | State | City)[];
  onChange: (e: Country | State | City) => void;
  onTextChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
const useGeoDropdown = ({ defaultValue, showFlag, options, onChange, onTextChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Country | State | City>();
  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const inputStyles: CSSProperties = {
    color: colors.Space[500],
    backgroundColor: '#f9f9f9',
    border: 'none',
    fontFamily: '"Abril Fatface", serif',
  };

  const handleInputClick = () => {
    setOpen(!open);
  };

  const getDisplay = () => {
    if (!selectedValue) {
      return searchValue ? searchValue : '';
    }
    return `${showFlag && 'emoji' in selectedValue ? selectedValue.emoji : ''} ${selectedValue.name}`;
  };

  const onItemClick = (option: Country | State | City) => {
    setSelectedValue(option);
    onChange(option);
  };

  const isSelected = (option: Country | State | City) => {
    if (!selectedValue) {
      return false;
    }
    return selectedValue.id === option.id;
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setSelectedValue(undefined);
    if (onTextChange) {
      onTextChange(e);
    }
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }
    return options.filter((option) => option.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0);
  };

  const clickHandler = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  useEffect(() => {
    if (defaultValue) setSelectedValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setSearchValue('');
    if (open && searchRef.current) {
      searchRef.current.focus();
    }
  }, [setOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Element)) {
        setOpen(false);
      }
    };

    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  });

  return {
    inputRef,
    searchRef,
    open,
    inputStyles,
    getOptions,
    handleInputClick,
    onSearch,
    getDisplay,
    onItemClick,
    isSelected,
    clickHandler,
  };
};

export default useGeoDropdown;
