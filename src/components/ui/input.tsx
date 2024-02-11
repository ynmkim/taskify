import * as React from 'react';
import Label from '@/components/common/Label';
import { cn } from '@/libs/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value: string | number;
  type?: React.HTMLInputTypeAttribute;
  requiredValue?: string;

  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, value = '', required = false, type, requiredValue, onChange, onBlur }, ref) => {
    return (
      <div>
        {label && <Label text={label} required={required} />}
        <div className="mt-2.5">
          <input
            ref={ref}
            type={type}
            value={value}
            placeholder="제목을 입력해 주세요"
            onChange={onChange}
            onBlur={onBlur}
            className={cn(
              `text-[14px] focus:outline-none violet w-full h-[42px] px-4 rounded-md border  text-black-333236' md:h-[48px] md:text-[16px]  ${requiredValue ? 'border-red-D6173A' : 'border-gray-D9D9D9'}`,
            )}
          />
        </div>
        {requiredValue && <p className="text-[14px] text-red-D6173A mt-[8px]">{requiredValue}</p>}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
