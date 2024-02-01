import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/libs/utils';
import Image from 'next/image';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2.5', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const radioGroupItemVariants = cva(`rounded-full`, {
  variants: {
    color: {
      green: 'bg-green-7AC555',
      purple: 'bg-purple-760DDE',
      orange: 'bg-orange-FFA500',
      blue: 'bg-blue-76A6EA',
      pink: 'bg-pink-E876EA',
    },
    size: {
      small: 'w-7 h-7',
      large: 'w-[30px] h-[30px] ',
    },
  },
});

export interface RadioGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof radioGroupItemVariants> {
  color: 'green' | 'purple' | 'orange' | 'blue' | 'pink';
  size: 'small' | 'large';
  value: string;
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, color, size = 'large', ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioGroupItemVariants({ color, size }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Image
          src="/assets/icons/check.svg"
          alt="선택됨"
          width={size === 'small' ? 22 : 24}
          height={size === 'small' ? 22 : 24}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
