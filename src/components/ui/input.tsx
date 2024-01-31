import * as React from 'react';
import Label from '@/components/common/Label';
import { cn } from '@/libs/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, value = '', required = false, className, type, ...props }, ref) => {
    return (
      <div>
        {label && <Label text={label} required={required} />}
        <div className="mt-2.5">
          <input
            type={type}
            value={value}
            className={cn(
              `block w-full rounded-md border border-solid px-[14px] py-[15px] md:text-[16px] lg:text-[16px] text-gray-9FA6B2 placeholder:text-gray40 focus:border-violet outline-0 h-[50px] `,
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
