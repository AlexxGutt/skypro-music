import { AxiosError } from 'axios';
import { setAccess } from '../store/features/authSlice';
import { AppDispatch } from '../store/store';
import { refreshToken } from '../services/auth/signInApi';

export const withReauth = async <T>(
  apiFunction: (access: string) => Promise<T>,
  refresh: string,
  dispatch: AppDispatch,
): Promise<T> => {
  try {
    return await apiFunction('');
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401) {
      try {
        const newAccessToken = await refreshToken(refresh);
        dispatch(setAccess(newAccessToken.access));
        return await apiFunction(newAccessToken.access);
      } catch (refreshError) {
        throw refreshError;
      }
    }

    throw error;
  }
};
