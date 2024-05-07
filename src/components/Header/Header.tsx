import styled from 'styled-components';

import { colors } from '../../constants/colors';
import { screen } from '../../constants/screen';

interface HeaderProps {
  title: string;
  headerEnd?: React.ReactElement;
}

export const Header = ({ title, headerEnd }: HeaderProps) => {
  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      {headerEnd}
    </Container>
  );
};

const Container = styled.div`
  color: black;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 33px 0;
  box-sizing: border-box;

  @media (max-width: ${screen.mobile.max}px) {
    margin-top: 76px;
    box-sizing: unset;
    border-radius: 0;
    border: none;
    border-bottom: solid 1px ${colors.Black[200]};
    border-top: solid 1px ${colors.Black[200]};
    padding-bottom: 8px;

    @supports (-webkit-touch-callout: none) {
      margin-top: calc(76px + var(--ios-bottom));
    }
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;

  @media (max-width: ${screen.mobile.max}px) {
    justify-content: center;
  }
`;

const Title = styled.div`
  font-family: 'Abril Fatface', serif;
  font-size: 40px;
  font-weight: 400;
  line-height: 44px;
  letter-spacing: 0em;
  text-align: left;
  color: #1b383a;

  @media (max-width: ${screen.mobile.max}px) {
    font-size: 28px;
    line-height: 32px;
    letter-spacing: 0em;
  }
`;
