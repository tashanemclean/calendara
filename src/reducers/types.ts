export interface AuthLoginResponse {
  name: string;
  city: string;
  state: string;
  categories: string;
  loggedIn: boolean;
  token: string;
}

export interface AuthLogoutResponse {
  name: string;
  user_id: string;
  access_token: string;
  refresh_token: string;
  expires_at: string;
}
