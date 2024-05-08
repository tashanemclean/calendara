import { useEffect, useMemo, useState } from 'react';
import { FieldValues } from 'react-hook-form';

import { useAuth } from '../../contexts/authContext';

const useLogin = () => {
  const {
    actions: { login },
    state: { loading, error },
  } = useAuth();
  const [loginError, setLoginError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);

  // TODO: prevent repeated login attempts
  const tooManyAttempts = useMemo(() => {
    return loginAttempts >= 5;
  }, [loginAttempts]);

  const handleLogin = async ({ email, password }: FieldValues) => {
    await login(String(email), String(password));
  };

  const actualError = useMemo(() => {
    return (
      (tooManyAttempts && "You've made too many recent attempts. Please try again later, or reset your password.") ||
      error ||
      loginError ||
      null
    );
  }, [error, loginError, tooManyAttempts]);

  useEffect(() => {
    if (error) {
      setLoginAttempts(loginAttempts + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    setLoginError('');
    setLoginAttempts(0);
  }, []);

  return {
    actualError,
    loading,
    tooManyAttempts,
    handleLogin,
  };
};

export default useLogin;
