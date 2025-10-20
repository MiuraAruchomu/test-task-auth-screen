import { createContext } from 'react';
import { IAuthContext } from '@/types/context/auth-context';

export const AuthContext = createContext<IAuthContext>({
  user: null,
});
