import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

import { colors } from '../../constants/colors';
import { TextButton } from '../Buttons';
import { Checkbox } from '../Checkbox';
import { ClickOutside } from '../Dropdown';
import { ExpandMoreIcon } from '../Icons';
import { SlideIn } from '../Transitions/SlideIn';

interface RegionFilterProps {
  overrideColor?: string;
  singleFilter?: boolean;
}

const items = ['Soccer', 'Basketball'];

export const ActivitiesCheckbox = ({ overrideColor }: RegionFilterProps) => {
  const [open, setOpen] = useState(false);
  // const { buttonRef, dropdownRef, style, checkboxItemsVM, handleChange } = useCategories();
  const dropdownRef = useRef(null);

  const clickHandler = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const closeHandler = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const renderActivityCheckbox = () =>
    items.map((item, key) => (
      <Checkbox
        key={`${item + key}`}
        name={item}
        value={item}
        text={item}
      />
    ));

  return (
    <ClickOutside
      enabled={open}
      onClick={closeHandler}
    >
      <CheckboxContainer>
        <TextButton
          className="activities-btn"
          text="Activities"
          onClick={clickHandler}
          iconRight={<ExpandMoreIcon color={overrideColor ?? colors.Black[500]} />}
          overrideTextColor={colors.Black[500]}
        />
        <CheckboxDropdown ref={dropdownRef}>
          <SlideIn enter={open}>{renderActivityCheckbox()}</SlideIn>
        </CheckboxDropdown>
      </CheckboxContainer>
    </ClickOutside>
  );
};

const CheckboxContainer = styled.div``;

const CheckboxDropdown = styled.div`
  position: relative;
  display: block;
  width: max-content;
  z-index: 100;
`;
