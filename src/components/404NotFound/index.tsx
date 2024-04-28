import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { screen } from '../../constants/screen';
import RouteConstants from '../../routing/RouteConstants';
import { Button } from '../Buttons/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="nav-hidden">
      <Heading>
        <Exclamation>WHOOPS!</Exclamation>
        <Message>Something went wrong.</Message>
        <Button onClick={() => navigate(RouteConstants.login)}>Back to home</Button>
      </Heading>
    </Container>
  );
};

export { NotFound };

const Container = styled.div`
  height: 100%;
  width: 100vw;
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 40px 40px 40vh;
  text-align: center;
  -webkit-box-flex: 1;
  flex-grow: 1;
  position: relative;
  height: -webkit-fill-available;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translateX(-50%);
    width: 100%;
    height: 40vh;
    background: url(https://unsplash.com/photos/a-piece-of-paper-sitting-on-top-of-a-table-t5MU1wb3mNQ) center bottom /
      cover no-repeat;
    mix-blend-mode: multiply;

    @media (min-width: 768px) {
      background-size: contain;
    }
  }
`;
const Exclamation = styled.div`
  position: relative;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 48px;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;
  color: rgb(28, 55, 56);

  &::before {
    content: '';
    position: absolute;
    background: url(https://unsplash.com/photos/a-piece-of-paper-sitting-on-top-of-a-table-t5MU1wb3mNQ) left top /
      contain no-repeat;
    width: 54px;
    height: 54px;
    left: -27px;
    top: -23px;

    @media (min-width: ${screen.desktop.min}px) {
      width: 128px;
      height: 128px;
      left: -60px;
      top: -45px;
    }
  }

  @media (min-width: ${screen.desktop.min}px) {
    font-size: 128px;
  }
  @media (min-width: 768px) {
    font-size: 78px;
  }
`;

const Message = styled.div`
  color: rgb(28, 55, 56);
  font-family: 'Abril Fatface', serif;
  font-weight: 400;
  font-size: 36px;
  line-height: 40px;
  margin-bottom: 32px;

  @media (min-width: ${screen.desktop.min}px) {
    font-size: 76px;
    line-height: 80px;
  }
  @media (min-width: 768px) {
    font-size: 56px;
    line-height: 60px;
  }
`;
