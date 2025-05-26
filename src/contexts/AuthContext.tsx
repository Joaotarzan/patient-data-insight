
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'patient' | 'researcher';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'patient' | 'researcher') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, userType: 'patient' | 'researcher'): Promise<boolean> => {
    // Simulate API call
    console.log('Login attempt:', { email, password, userType });
    
    // Mock successful login
    const mockUser: User = {
      id: '1',
      name: userType === 'patient' ? 'João Silva' : 'Dr. Maria Santos',
      email,
      type: userType
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
