import { useState } from 'react';
import Image from 'next/image';

interface IWrapperProps {
  type?: string;
  name: string;
  iconName?: string;
  placeholder?: string;
  value: string;
  setValue: ({ field, value }: { field: string; value: string }) => void;
  error?: string | null;
  resetError: (field?: string) => void;
}

export default function UiInputWrapper({
  type,
  name,
  iconName,
  placeholder,
  value,
  setValue,
  error,
  resetError,
}: IWrapperProps) {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    resetError(name);
    setIsFocus(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetError();
    setValue({ field: name, value: e.target.value });
  };

  return (
    <label
      className={`relative flex px-1 py-[7px] border border-[#d9d9d9] rounded-lg cursor-text 
        ${isFocus && 'border-custom-blue outline-2 outline-custom-blue-light'} 
        ${error && !isFocus && 'border-custom-error'} 
        ${error && error !== ' ' && 'mb-3'}`}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {iconName && (
        <Image
          src={`/icons/input/${iconName}.svg`}
          width={15}
          height={15}
          alt={iconName}
          className='mx-2 pointer-events-none'
        />
      )}
      {placeholder && (
        <span
          className={`absolute left-8 text-[#00000040] ${value && 'hidden'}`}
        >
          {placeholder}
        </span>
      )}
      <input type={type ?? 'text'} value={value} onChange={handleChange} />
      {error && error !== ' ' && (
        <span className='absolute top-[105%] text-sm text-custom-error pointer-events-none'>
          {error}
        </span>
      )}
    </label>
  );
}
