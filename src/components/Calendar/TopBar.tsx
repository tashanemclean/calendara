import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { fadeIn } from '../../constants/fadeIn';
import { NextArrowIcon, PrevArrowIcon } from '../Icons';
import type { Dayjs } from 'dayjs';

interface Props {
  date: Dayjs;
  titleTextStyle: object;
  onPrevClick: () => void;
  onNextClick: () => void;
}

export const TopBar = ({ titleTextStyle, date, onPrevClick, onNextClick }: Props) => {
  return (
    <Container>
      <span onClick={onPrevClick}>
        <PrevArrowIcon />
      </span>
      <span
        key={date.format()}
        style={titleTextStyle}
      >
        {date.format('MMMM YYYY').toUpperCase()}
      </span>
      <span onClick={onNextClick}>
        <NextArrowIcon />
      </span>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  > * {
    margin-bottom: 5%;
    margin-top: 3%;
  }

  > img {
    user-select: none;
    cursor: pointer;
    color: ${colors.gray};
    transition: 0.5s ease all;
    margin-left: 5px;
    margin-right: 5px;
  }

  > img:hover {
    filter: brightness(0);
  }

  > span {
    font-size: 1.35em;
    color: #424242;
    animation: ${fadeIn} 0.5s ease;
  }
`;
