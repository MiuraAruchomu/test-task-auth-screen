'use client';

import { useState } from 'react';
import { TAuthStep } from '@/types/context/auth-step-context';
import { AuthStepContext } from '@/context/AuthStepContext';
import { useAuth } from '@/hooks/useAuth';
import Signin from '@/components/elements/signin/Signin';
import TwoFA from '@/components/elements/signin/TwoFA';
import { redirect } from 'next/navigation';

export default function SigninPage() {
  const [step, setStep] = useState<TAuthStep>('login');
  const { user } = useAuth();

  if (user) redirect('/');

  return (
    <AuthStepContext.Provider value={{ step, setStep }}>
      <div className='w-[100dvw] h-[100dvh] flex justify-center items-center bg-[#f5f5f5]'>
        {step === 'login' ? <Signin /> : <TwoFA />}
      </div>
    </AuthStepContext.Provider>
  );
}
