import axios from 'axios';
import { BASE_URL } from '../constants';

export interface SignUpData {
  email: string;
  password: string;
  username: string;
}

export interface SignUpResponse {
  message: string;
  result: {
    _id: number;
    email: string;
    username: string;
  };
  success: boolean;
}

export interface SignUpResult {
  success: boolean;
  data?: SignUpResponse;
  error?: string;
  status?: number;
}

export async function signUp(userData: SignUpData): Promise<SignUpResult> {
  try {
    const response = await axios.post<SignUpResponse>(
      `${BASE_URL}/user/signup/`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const backendError = error.response.data as { message?: string };

      return {
        success: false,
        error: backendError.message || 'Ошибка регистрации',
        status: error.response.status,
      };
    }

    return {
      success: false,
      error: 'Ошибка соединения с сервером',
      status: 500,
    };
  }
}
