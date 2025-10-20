import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { IApiError } from '@/types/api/api-error';
import { AuthStepContext } from '@/context/AuthStepContext';

export const useLogin = () => {
  const { setStep } = useContext(AuthStepContext);
  const [serverError, setServerError] = useState<string | null>(null);
  const resetServerError = () => {
    setServerError(null);
  };
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      if (email === 'test@test.test' && password === 'Test12345') {
        return Promise.resolve({ status: 200, message: 'Success' });
      } else if (email === 'test@test.test') {
        return Promise.reject({
          status: 401,
          message: 'Incorrect password',
        });
      } else if (email !== 'test@test.test') {
        return Promise.reject({
          status: 404,
          message: 'User not found',
        });
      }
      return Promise.reject({ status: 500, message: 'Unexpected error' });
    },
    onSuccess: () => {
      setStep('2fa');
    },
    onError: (err: IApiError) => {
      switch (err.status) {
        case 401:
          setServerError('Incorrect login or password');
          break;
        case 404:
          setServerError('Incorrect login or password');
          break;
        case 500:
          setServerError('Server error');
          break;
        default:
          setServerError('Unexpected error');
      }
    },
  });

  const twoFAMutation = useMutation({
    mutationFn: (code: string) => {
      if (code === '131311') {
        return Promise.resolve({
          status: '200',
          message: 'Success',
          data: {
            token: 'fake_token',
          },
        });
      } else if (code !== '131311') {
        return Promise.reject({ status: 401, message: 'Invalid code' });
      }
      return Promise.reject({ status: 500, message: 'Unexpected error' });
    },
    onSuccess: (data) => {
      document.cookie = `ACCESS_TOKEN=${data.data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
      setStep('login');
      router.push('/');
    },
    onError: (err: IApiError) => {
      switch (err.status) {
        case 401:
          setServerError(err.message);
          break;
        case 500:
          setServerError('Server error');
          break;
        default:
          setServerError('Unexpected error');
      }
    },
  });

  return { loginMutation, twoFAMutation, serverError, resetServerError };
};
