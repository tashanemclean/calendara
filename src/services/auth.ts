import { AuthLoginResponse, AuthLogoutResponse } from '../reducers/types';
import api from './api';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;

export const login = async (email: string, password: string): Promise<AuthLoginResponse> => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const endpoint = `/v1/signin`;
  const data = await api.post<AuthLoginResponse>(
    endpoint,
    {
      name: email,
      password,
    },
    {
      headers,
    },
  );
  return data.data;
};

export const logout = async (): Promise<AuthLogoutResponse> => {
  const url = `${apiBaseUrl}/v1/signout`;
  return (await api.post<AuthLogoutResponse>(url))?.data;
};

export const signUp = async (
  email: string,
  password: string,
  city: string,
  state: string,
  categories: string[],
): Promise<AuthLoginResponse> => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const endpoint = `/v1/signup`;
  const data = await api.post<AuthLoginResponse>(
    endpoint,
    {
      name: email,
      password,
      city,
      state,
      categories,
    },
    {
      headers,
    },
  );
  return data.data;
};
