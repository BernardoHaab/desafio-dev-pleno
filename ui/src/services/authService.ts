import api from '@/lib/api';
import { LoginRequest, LoginResponse } from '@/types/auth';

export const authService = {
  async login({ email, password }: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },
};
