import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/libs/utils';

const badgeVariants = cva(
  `inline-flex items-center rounded px-1.5 py-[3px] bg-gray-EEEEEE text-xs font-normal text-gray-787486`,
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants(), className)} {...props} />;
}

export { Badge, badgeVariants };
