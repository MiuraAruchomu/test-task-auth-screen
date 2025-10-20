import Image from 'next/image';
import { useLogin } from '@/hooks/useLogin';
import { useFormState } from '@/hooks/useFormState';
import UiButtonWrapper from '@/components/ui/button/Wrapper';
import UiInputWrapper from '@/components/ui/input/Wrapper';

const initialState = {
  email: '',
  password: '',
};

export default function Signin() {
  const { formState, isFormFilled, setValue, handleSubmit } = useFormState<
    typeof initialState
  >({
    initialState,
    submitFn,
  });

  const { loginMutation, serverError, resetServerError } = useLogin();

  async function submitFn({ email, password }: typeof initialState) {
    loginMutation.mutate({ email, password });
  }

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
      <h1 className='text-3xl text-center'>
        Sign in to your account to continue
      </h1>
      <form className='w-full mt-6 flex flex-col gap-4'>
        <UiInputWrapper
          name='email'
          iconName='login'
          placeholder='Email'
          value={formState.email}
          setValue={setValue}
          error={serverError && ' '}
          resetError={resetServerError}
        />
        <UiInputWrapper
          type='password'
          name='password'
          iconName='password'
          placeholder='Password'
          value={formState.password}
          setValue={setValue}
          error={serverError && ' '}
          resetError={resetServerError}
        />
        {serverError && (
          <span className='my-[-4px] text-center text-custom-error'>
            {serverError}
          </span>
        )}
        <UiButtonWrapper
          name='Log in'
          isActive={isFormFilled && !serverError}
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}
