import { IAuthStepContext } from '@/types/context/auth-step-context';
import { createContext } from 'react';

export const AuthStepContext = createContext<IAuthStepContext>({
  step: 'login',
  setStep: () => {},
});
