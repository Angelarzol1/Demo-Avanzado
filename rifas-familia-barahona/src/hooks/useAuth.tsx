'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true
  });

  useEffect(() => {
    // Simular carga de usuario desde localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false
        });
      } catch (error) {
        localStorage.removeItem('user');
        setAuthState({
          user: null,
          isAuthenticated: false,
          loading: false
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simular login - en producción esto sería una llamada a la API
      
      // Credenciales de admin
      if (email === 'admin' && password === 'admin') {
        const adminUser: User = {
          id: 'admin',
          email: 'admin@familiabarahona.com',
          name: 'Administrador',
          role: 'admin',
          createdAt: new Date()
        };
        
        localStorage.setItem('user', JSON.stringify(adminUser));
        setAuthState({
          user: adminUser,
          isAuthenticated: true,
          loading: false
        });
        return true;
      }

      // Simular usuario regular
      if (email && password) {
        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
          role: 'user',
          createdAt: new Date()
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Simular registro
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role: 'user',
        createdAt: new Date()
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setAuthState({
        user,
        isAuthenticated: true,
        loading: false
      });
      return true;
    } catch (error) {
      console.error('Error en registro:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false
    });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}
