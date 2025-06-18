import React, { createContext, useContext, useState } from 'react';

export type Role = 'ADMIN' | 'SELLER';
interface AuthState { token: string | null; role: Role | null; }

const AuthContext = createContext<{auth: AuthState; setAuth: (a: AuthState) => void}>({auth: {token: null, role: null}, setAuth: () => {}});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ token: null, role: null });
  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
