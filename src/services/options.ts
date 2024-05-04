import { ApiRequestPayload, ApiResponseRaw } from '../utils/adapters';
import api from './api';

export const getResponses = async (payload: ApiRequestPayload): Promise<ApiResponseRaw> => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const endpoint = `http://calendara-go-app-9000-tcp:9000/v1/process`;
  const data = await api.post<ApiResponseRaw>(endpoint, payload, {
    headers,
  });
  return data.data;
};
