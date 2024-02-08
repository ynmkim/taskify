/* eslint-disable react/display-name */
import { forwardRef, useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { AuthInputType, AuthInputProps } from '@/types/AuthType';
import CustomInput from '@/components/common/CustomInput';

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ inputType, id, labelContext, placeholder, isError, ...props }, ref) => {
    const [isBlind, setIsBlind] = useState(true);

    let type, autoComplete;

    switch (inputType) {
      case AuthInputType.Email:
        type = 'email';
        autoComplete = 'email';
        break;
      case AuthInputType.Password:
        type = isBlind ? 'password' : 'text';
        autoComplete = 'new-password';
        break;
      case AuthInputType.Nickname:
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
          <CustomInput
            {...props}
            ref={ref}
            id={id}
            type={type}
            isError={isError}
            placeholder={placeholder}
            autoComplete={autoComplete}
          />
          {inputType === AuthInputType.Password && (
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

export default AuthInput;
