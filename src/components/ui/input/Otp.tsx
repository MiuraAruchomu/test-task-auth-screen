import { useRef, useState } from 'react';

interface IinputOTPprops {
  length?: number;
  error?: string | null;
  resetError?: () => void;
  onChange?: (code: string) => void;
}

export default function UiInputOTP({
  length = 6,
  error,
  resetError,
  onChange,
}: IinputOTPprops) {
  const inputs = Array.from({ length });
  const refs = useRef<HTMLInputElement[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const value = e.target.value.replace(/\D/g, '');
    if (!value) {
      e.target.value = '';
      return;
    }
    e.target.value = value[0];
    if (i < length - 1) {
      refs.current[i + 1].focus();
    }
    triggerChange();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    i: number,
  ) => {
    const input = e.currentTarget;

    if (e.key === 'Backspace') {
      if (input.value) {
        e.preventDefault();
        input.value = '';
        triggerChange();
      } else if (i > 0) {
        e.preventDefault();
        refs.current[i - 1].focus();
        refs.current[i - 1].value = '';
        triggerChange();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '');
    if (paste.length === length) {
      paste.split('').forEach((value, i) => (refs.current[i].value = value));
      refs.current[length - 1].focus();
      triggerChange();
    }
    e.preventDefault();
  };

  const triggerChange = () => {
    const code = refs.current.map((el) => el.value ?? '').join('');
    if (typeof resetError === 'function') resetError();
    if (typeof onChange === 'function') onChange(code);
  };

  return (
    <div onPaste={handlePaste} className='flex gap-3'>
      {inputs.map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            if (el) refs.current[i] = el;
          }}
          type='text'
          maxLength={1}
          className={`w-13 h-15 px-[11px] py-[10px] text-2xl font-bold text-center border border-[#d9d9d9] rounded-lg cursor-text 
            ${focusedIndex === i && 'border-custom-blue outline-2 outline-custom-blue-light'} 
            ${error && focusedIndex !== i && 'border-custom-error'}`}
          onFocus={() => setFocusedIndex(i)}
          onBlur={() => setFocusedIndex(null)}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
        />
      ))}
    </div>
  );
}
