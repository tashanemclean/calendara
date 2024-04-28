import styled from 'styled-components';
import { Button } from '../Buttons';
import { EmailField } from '../Forms/EmailField';
import FormManager from '../Forms/FormManager';
import { PasswordField } from '../Forms/PasswordField';
import useLogin from './useLogin';
import { colors } from '../../constants/colors';
import { screen } from '../../constants/screen';
import { H2 } from '../../typography';
import { ErrorMessageContainer } from '../../utils/common/style';

export const LoginForm = () => {
  const { actualError, loading, tooManyAttempts, handleLogin } = useLogin();

  const renderLoginForm = () => (
    <FormManager
      onSubmit={handleLogin}
      render={({ control, onSubmit }) => (
        <>
          <EmailField
            control={control}
            isRequired={true}
            id="email"
            label="Email Address"
            placeholder="Email"
            containerWidth="100%"
          />
          <PasswordField
            control={control}
            isRequired={true}
            id="password"
            label="Password"
            placeholder="Password"
          />
          <Button
            onClick={onSubmit}
            type="submit"
            disabled={loading || tooManyAttempts}
          >
            {loading ? 'Loading' : 'Continue'}
          </Button>
        </>
      )}
    />
  );

  return (
    <Background>
      <VStack>
        {/* Define logo */}
        <CalendaraLogo alt="Calendara logo" />
        <Container className="nav-hidden">
          <H2.Desktop>Sign in to Calendara</H2.Desktop>
          {actualError ? <ErrorMessageContainer>{actualError}</ErrorMessageContainer> : null}
          {renderLoginForm()}
        </Container>
      </VStack>
    </Background>
  );
};

const Background = styled.div`
  background: linear-gradient(0deg, white 0%, white 50%, ${colors.Space[500]} 50%, ${colors.Space[500]} 50%);
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
`;

const Divider = styled.div`
  width: 57.6px;
  border: solid 4px ${colors.Mustard[500]};
  border-radius: 2px;
  padding: 0;
  margin: 0;
`;

const VStack = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 41px;
`;

const CalendaraLogo = styled.img`
  margin: auto;
  position: relative;
  left: 0;
  right: 0;

  @media (max-width: ${screen.mobile.max}px) {
    display: none;
  }
`;

const Container = styled.div`
  padding: 64px;
  border-radius: 24px;
  box-shadow:
    0px 2px 4px -2px rgba(32, 32, 34, 0.06),
    0px 4px 8px -2px rgba(32, 32, 34, 0.1);
  background-color: ${colors.Solids.White};
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 384px;
  position: relative;

  @media (max-width: ${screen.mobile.max}px) {
    box-sizing: border-box;
    margin: 16px;
    padding: 32px;
    width: 90vw;
    top: 50%;
    left: 0;
  }

  button {
    width: 100%;
  }
`;
