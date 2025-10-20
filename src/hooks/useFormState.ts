import { useEffect, useState } from 'react';

export const useFormState = <T extends Record<string, any>>({
  initialState,
  validateFn,
  submitFn,
}: {
  initialState: T;
  validateFn?: (values: T) => Partial<Record<keyof T, string>>;
  submitFn: (values: T) => Promise<void>;
}) => {
  const [formState, setFormState] = useState(initialState);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof T, string>>
  >({});
  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);

  const setValue = ({ field, value }: { field: string; value: string }) => {
    setFormState({
      ...formState,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    if (typeof validateFn === 'function') {
      const errors = validateFn(formState);
      if (Object.keys(errors).length) {
        setFormErrors(errors);
        return;
      }
    }

    try {
      await submitFn(formState);
    } catch (err) {}
  };

  useEffect(() => {
    const allFilled = Object.values(formState).every(
      (value) => value !== '' && value !== null && value !== undefined,
    );
    let hasNoError = true;
    if (Object.keys(formErrors).length) {
      hasNoError = Object.values(formErrors).every((value) => value === null);
    }
    setIsFormFilled(allFilled && hasNoError);
  }, [formState, formErrors]);

  return {
    formState,
    formErrors,
    isFormFilled,
    setValue,
    handleSubmit,
    resetError: (field: string) =>
      setFormErrors({ ...formErrors, [field]: null }),
  };
};
