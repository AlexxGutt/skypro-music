import axios from 'axios';
import { BASE_URL } from '../constants';

export interface SignInData {
  email: string;
  password: string;
}

export interface SignInResponse {
  _id: number;
  email: string;
  username: string;
}

export async function signIn(credentials: SignInData) {
  try {
    const userResponse = await axios.post<SignInResponse>(
      `${BASE_URL}/user/login/`,
      credentials,
    );

    const tokenResponse = await axios.post<{ access: string; refresh: string }>(
      `${BASE_URL}/user/token/`,
      credentials,
    );

    localStorage.setItem('accessToken', tokenResponse.data.access);
    localStorage.setItem('refreshToken', tokenResponse.data.refresh);

    return {
      success: true,
      user: userResponse.data,
      tokens: tokenResponse.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        error: error.response.data?.message || 'Ошибка при входе',
        status: error.response.status,
      };
    }
    return {
      success: false,
      error: 'Ошибка соединения с сервером',
    };
  }
}
