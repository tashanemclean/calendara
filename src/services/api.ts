import axios from 'axios';

const api = axios.create({ withCredentials: true });

api.defaults.headers.common['Content-Type'] = 'application/json';
api.defaults.headers.common.Accept = 'application/json';
api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
api.defaults.baseURL = import.meta.env.VITE_API_BASE_URL as string;

api.interceptors.request.use((config) => {
  const claims = localStorage.getItem('userClaims');

  if (claims) {
    const data = JSON.parse(claims) as { accessToken: string };
    config.headers.Authorization = `Bearer ${data.accessToken}`;
  }

  return config;
});

api.interceptors.response.use((response) => {
  const { refresh_access_token: refreshAccessToken } = response.headers;

  if (refreshAccessToken) {
    localStorage.setItem('userClaims', JSON.stringify({ accessToken: refreshAccessToken as string }));
  }

  return response;
});

export default api;
