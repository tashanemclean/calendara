import { AxiosError } from 'axios';

type ErrorType = Error | AxiosError;

export interface ErrorCodeResponse {
  message: string;
}

const getMessage = (message?: string, fallback?: string) => message || fallback || 'Unknown error occurred';

export const handleApiError = (err: ErrorType, fallback?: string) => {
  if (err instanceof AxiosError) {
    return getMessage((err.response?.data as ErrorCodeResponse)?.message);
  }
  return err.message || fallback || 'Unknown error occurred';
};
