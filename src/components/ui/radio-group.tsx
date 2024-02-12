import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/libs/utils';
import Image from 'next/image';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & { type?: string }
>(({ className, type, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn(type === 'boardEdit' ? 'grid gap-0 lg:gap-2.5 md:gap-2.5' : 'grid gap-2.5', className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const radioGroupItemVariants = cva(`rounded-full w-7 h-7 md:w-[30px] md:h-[30px]`, {
  variants: {
    color: {
      green: 'bg-green-7AC555',
      purple: 'bg-purple-760DDE',
      orange: 'bg-orange-FFA500',
      blue: 'bg-blue-76A5EA',
      pink: 'bg-pink-E876EA',
    },
  },
});

export interface RadioGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof radioGroupItemVariants> {
  color: 'green' | 'purple' | 'orange' | 'blue' | 'pink';
  value: string;
}

const RadioGroupItem = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, RadioGroupItemProps>(
  ({ className, color, ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Item ref={ref} className={cn(radioGroupItemVariants({ color }), className)} {...props}>
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <div className="relative w-[22px] h-[22px] md:w-[24px] md:h-[24px]">
            <Image fill src="/check.svg" alt="선택됨" className="object-cover" />
          </div>
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    );
  },
);
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
