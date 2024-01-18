import { createContext } from 'react';
import { User } from '../../types/user';

export interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
  accessToken?: string;
}

export const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  accessToken: undefined
};

export interface AuthContextType extends State {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (request: any) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => Promise.resolve()
});
