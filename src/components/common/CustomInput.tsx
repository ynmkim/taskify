import { forwardRef } from 'react';
import { CustomInputProps } from '../../../type';

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({ isError, ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={`block w-full border border-gray-D9D9D9 ${isError ? 'border-red-D6173A' : ''} rounded-lg px-3 py-3 placeholder:text-gray-9FA6B2 focus:  focus:outline-violet-5534DA`}
    />
  );
});

CustomInput.displayName = 'CustomInput';

export default CustomInput;
