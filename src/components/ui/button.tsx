import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/libs/utils';

const buttonVariants = cva(
  'inline-flex font-medium items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      text: {
        default: 'text-violet-5534DA text-sm',
        login: 'text-white text-lg',
        confirm: 'text-gray-787486 text-[21px] md:text-[25px] lg:text-[28px]',
      },
      size: {
        default: 'w-[109PX] h-7 md:w-[72px] md:[30px] lg:[84px] lg:h-8',
        login: 'w-[351px] h-[50px] lg:w-[520px]',
        confirm: 'w-[138px] h-[42px] lg:w-[120px] lg:h-12 ',
        delete: 'w-[52px] h-7 lg:w-[82px] lg:h-8',
      },
      variant: {
        default: 'bg-white border border-gray-D9D9D9',
        violet: 'bg-violet-5534DA text-white disabled:bg-gray',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      text: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, text, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, text, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
