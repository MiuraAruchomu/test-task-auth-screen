import { useEffect, useState } from 'react';
import Image from 'next/image';
import UiInputOTP from '@/components/ui/input/Otp';
import { useLogin } from '@/hooks/useLogin';
import UiButtonWrapper from '@/components/ui/button/Wrapper';

export default function TwoFA() {
  const [code, setCode] = useState<string>('');
  const [isCodeFullLength, setIsCodeFullLength] = useState<boolean>(false);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  const { twoFAMutation, serverError, resetServerError } = useLogin();

  const handleSubmit = async () => {
    twoFAMutation.mutate(code);
  };

  const handleResend = async () => {
    setTimeLeft(30);
    setIsExpired(false);
    resetServerError();

    // Отправляем повторный запрос на генерацию 2fa
  };

  useEffect(() => {
    if (timeLeft === 0) {
      if (isFirstLoad) setIsFirstLoad(false);
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    setIsCodeFullLength(code.length === 6);
  }, [code]);

  return (
    <div className='w-[440px] p-8 flex flex-col items-center bg-white rounded-lg'>
      <div className='w-fit my-[27px] flex gap-[9px]'>
        <Image
          src='/icons/logos/symbol.svg'
          width={25}
          height={25}
          alt='symbol'
        />
        <span className='font-bold'>Company</span>
      </div>
      <h1 className='text-3xl text-center'>Two-Factor Authentication</h1>
      <p className='text-center'>
        Enter the 6-digit code from the Google Authenticator app
      </p>
      <form className='w-full mt-6 flex flex-col gap-4'>
        <UiInputOTP
          error={serverError}
          resetError={resetServerError}
          onChange={setCode}
        />
        {serverError && (
          <span className='block mt-[-10px] text-custom-error'>
            {serverError}
          </span>
        )}
        {(isExpired || !isFirstLoad) && !isCodeFullLength && (
          <UiButtonWrapper
            name='Get new'
            isActive={!timeLeft}
            onClick={handleResend}
          />
        )}
        {isCodeFullLength && (
          <UiButtonWrapper
            name='Continue'
            isActive={isCodeFullLength && !serverError}
            onClick={handleSubmit}
          />
        )}
      </form>
    </div>
  );
}
