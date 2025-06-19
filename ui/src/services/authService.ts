import api from '@/lib/api';
import { LoginRequest, LoginResponse } from '@/types/auth';
import { User } from '@/types/user';
import Cookies from 'js-cookie';

export const authService = {
  async login({ email, password }: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    Cookies.set('token', response.data.access_token, {
      expires: 2,
      secure: true,
      sameSite: 'Strict',
    });
    return response.data;
  },

  logout() {
    Cookies.remove('token');
  },

  async validateUser(): Promise<User> {
    const response = await api.get('/auth/validate-token');
    return response.data;
  },

  async serverIsValidToken(token: string): Promise<boolean> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}auth/validate-token`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.status === 200;
  },
};
