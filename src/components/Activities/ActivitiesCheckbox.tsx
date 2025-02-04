import styled from 'styled-components';

import { colors } from '../../constants/colors';
import { IconContainer } from '../../utils/common/style';
import { TextButton } from '../Buttons';
import { Checkbox } from '../Checkbox';
import { ClickOutside } from '../Dropdown';
import { ExpandMoreIcon } from '../Icons';
import { SlideIn } from '../Transitions/SlideIn';
import useActivities from './useActivities';

interface RegionFilterProps {
  overrideColor?: string;
  singleFilter?: boolean;
}

export const ActivitiesCheckbox = ({ overrideColor }: RegionFilterProps) => {
  const { dropdownRef, items, open, clickHandler, closeHandler, onUpdate } = useActivities();

  const renderCheckbox = () => (
    <Checkbox
      items={items}
      onClick={onUpdate}
    />
  );

  return (
    <ClickOutside
      enabled={open}
      onClick={closeHandler}
    >
      <CheckboxContainer>
        <TextButton
          className="checkbox-btn"
          text="Activity"
          onClick={clickHandler}
          iconRight={
            <IconContainer>
              <ExpandMoreIcon color={overrideColor ?? colors.Space[500]} />
            </IconContainer>
          }
          overrideTextColor={colors.Space[500]}
        />
        <CheckboxDropdown ref={dropdownRef}>
          <SlideIn enter={open}>{renderCheckbox()}</SlideIn>
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
