import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../contexts/auth';

export const useAuth = <T = AuthContextType>() => useContext(AuthContext) as T;
