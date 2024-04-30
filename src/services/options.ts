import { ApiResponse } from '../reducers/api';
import { ApiRequestPayload } from '../utils/adapters';
import api from './api';

export const getResponses = async (payload: ApiRequestPayload): Promise<ApiResponse> => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const endpoint = `/v1/process`;
  const data = await api.post<ApiResponse>(endpoint, payload, {
    headers,
  });
  return data.data;
};
