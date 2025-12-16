'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { loginCustomer, registerCustomer } from './woocommerceApi';

interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
}

interface RegisterData {
  email: string;
  username: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

interface LoginResponse {
  user_id: number;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user on mount
    const savedUser = Cookies.get('caishen_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser) as User);
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        Cookies.remove('caishen_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await loginCustomer(username, password) as LoginResponse;
      const userData: User = {
        id: response.user_id,
        email: response.user_email,
        username: response.user_nicename,
        first_name: response.user_display_name,
        last_name: '',
      };
      
      setUser(userData);
      Cookies.set('caishen_user', JSON.stringify(userData), { expires: 7 });
      Cookies.set('caishen_token', response.token, { expires: 7 });
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      await registerCustomer(data);
      // Auto-login after registration
      await login(data.username, data.password);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('caishen_user');
    Cookies.remove('caishen_token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
