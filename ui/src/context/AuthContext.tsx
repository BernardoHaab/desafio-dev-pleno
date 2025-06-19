import { authService } from '@/services/authService';
import { LoginRequest } from '@/types/auth';
import { User } from '@/types/user';
import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (login: LoginRequest) => Promise<User | null>;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    console.log('Validating user session...');
    const tokenCookie = Cookies.get('token');

    if (!tokenCookie) {
      setUser(null);
      return;
    }

    authService
      .validateUser()
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        setUser(null);
        authService.logout();
      });
  }, []);

  const login = async (login: LoginRequest) => {
    const response = await authService.login(login);
    setUser(response.user);
    return response.user;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    // router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
