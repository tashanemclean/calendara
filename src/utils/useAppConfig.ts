import { useMemo } from 'react';

const env = import.meta.env.NODE_ENV as string;
const apiUrl = import.meta.env.VITE_API_BASE_URL as string;

const useAppConfig = () => {
  const settings = useMemo(
    () => ({
      apiUrl: apiUrl,
      isProduction: env ? env === 'Production' : true,
    }),
    [env],
  );

  return {
    ...settings,
    appName: 'Calendara',
    featureFlags: {
      isAuthenticationRequired: false,
    },
  };
};

export default useAppConfig;
