import { jwtDecode as decode } from 'jwt-decode';

import axiosInstance from '../../utils/axios';

// ----------------------------------------------------------------------

export const STORAGE_KEY_ACCESS = 'accessToken';
export const STORAGE_KEY_REFRESH = 'refreshToken';

// ----------------------------------------------------------------------

export function jwtDecode(token: string) {
  return decode(token);
}

export function isValidToken(token: string) {
  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return (decoded as any).exp > currentTime;
  } catch (error) {
    return false;
  }
}

// ----------------------------------------------------------------------

export function setSession(accessToken: string | null, refreshToken: string | null) {
  if (accessToken && refreshToken) {
    localStorage.setItem(STORAGE_KEY_ACCESS, accessToken);
    localStorage.setItem(STORAGE_KEY_REFRESH, refreshToken);

    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem(STORAGE_KEY_ACCESS);
    localStorage.removeItem(STORAGE_KEY_REFRESH);

    delete axiosInstance.defaults.headers.common.Authorization;
  }
}