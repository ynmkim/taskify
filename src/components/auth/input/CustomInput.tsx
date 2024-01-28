/* eslint-disable react/display-name */
import { forwardRef, useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { InputType, CustomInputProps } from '@/../type';

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ inputType, id, labelContext, placeholder, isError, ...props }, ref) => {
    const [isBlind, setIsBlind] = useState(true);

    let type, autoComplete;

    switch (inputType) {
      case InputType.Email:
        type = 'email';
        autoComplete = 'email';
        break;
      case InputType.Password:
        type = isBlind ? 'password' : 'text';
        autoComplete = 'new-password';
        break;
      case InputType.Nickname:
        type = 'text';
        autoComplete = 'off';
        break;
      default:
        break;
    }

    const handlePasswordBlind = () => {
      setIsBlind((prev) => !prev);
    };

    return (
      <div className="grid w-full items-center gap-1.5 text-black-333236">
        <label htmlFor={id}>{labelContext}</label>
        <div className="relative">
          <input
            {...props}
            ref={ref}
            className={`block w-full border border-gray-D9D9D9 ${isError ? 'border-red-D6173A' : ''} rounded-lg px-3 py-3 placeholder:text-gray-9FA6B2 focus:  focus:outline-violet-5534DA`}
            type={type}
            id={id}
            placeholder={placeholder}
            autoComplete={autoComplete}
          />
          {inputType === InputType.Password && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center" onClick={handlePasswordBlind}>
              {isBlind ? (
                <IoEyeOffOutline size={24} className="cursor-pointer" color="#9FA6B2" />
              ) : (
                <IoEyeOutline size={24} className="cursor-pointer" color="#9FA6B2" />
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);

export default CustomInput;
