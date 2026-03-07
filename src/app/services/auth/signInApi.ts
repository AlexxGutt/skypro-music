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

export async function signIn(data: SignInData) {
  try {
    const userResponse = await axios.post<SignInResponse>(
      `${BASE_URL}/user/login/`,
      data,
    );

    return {
      success: true,
      user: userResponse.data,
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

type accessTokenType = {
  access: string;
};

type refreshTokenType = {
  refresh: string;
};

type tokensType = accessTokenType & refreshTokenType;

export const getTokens = (data: SignInData): Promise<tokensType> => {
  return axios.post(BASE_URL + '/user/token/', data).then((res) => res.data);
};

export const refreshToken = (refresh: string): Promise<accessTokenType> => {
  return axios
    .post(BASE_URL + '/user/token/refresh', { refresh })
    .then((res) => res.data);
};
