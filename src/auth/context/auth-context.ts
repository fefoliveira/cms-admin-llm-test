import { createContext } from 'react';

import { AuthUserType } from 'src/types/auth';

// ----------------------------------------------------------------------

export type AuthContextType = {
  user: AuthUserType | null;
  method: string;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);