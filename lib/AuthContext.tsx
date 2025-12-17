'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
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
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
  data?: {
    id?: number;
    user_id?: number;
    ID?: number;
  };
  user_id?: number;
  id?: number;
  ID?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Safe Base64 encoder for browser (btoa) / Node (Buffer)
const encodeBasicAuth = (value: string) => {
  if (typeof window === 'undefined') {
    return Buffer.from(value, 'utf8').toString('base64');
  }
  return window.btoa(value);
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      const response = (await loginCustomer(username, password)) as LoginResponse;

      console.log('🔐 Login response:', response);

      const authString =
        'ck_9a1fbb9afa025bbe8591eb4322c3e1c68e1b1002:cs_42d947c7a1acb0c0ca89ca17b35629a530097e44';
      const basicToken = encodeBasicAuth(authString);

      const customerResponse = await fetch(
        `https://cms.caishenunited.com/wp-json/wc/v3/customers?email=${encodeURIComponent(
          response.user_email,
        )}`,
        {
          headers: {
            Authorization: `Basic ${basicToken}`,
          },
        },
      );

      if (!customerResponse.ok) {
        throw new Error('Failed to fetch customer details');
      }

      const customers = await customerResponse.json();
      console.log('👥 Customer data:', customers);

      if (!customers || !Array.isArray(customers) || customers.length === 0) {
        throw new Error('Customer not found');
      }

      const customer = customers[0];

      const userData: User = {
        id: customer.id,
        email: customer.email,
        username: customer.username || response.user_nicename,
        first_name: customer.first_name || '',
        last_name: customer.last_name || '',
      };

      console.log('✅ User data created:', userData);

      setUser(userData);
      Cookies.set('caishen_user', JSON.stringify(userData), { expires: 7 });
      Cookies.set('caishen_token', response.token, { expires: 7 });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const newUser = await registerCustomer(data);
      console.log('📝 Registration response:', newUser);
      await login(data.username, data.password);
    } catch (error) {
      console.error('Registration error:', error);
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
