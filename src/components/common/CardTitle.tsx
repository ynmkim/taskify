import React from 'react';
import { cn } from '@/libs/utils';

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function CardTitle({ className, children, ...props }: TitleProps) {
  return (
    <h2 className={cn('text-xl md:text-2xl font-bold text-black-333236', className)} {...props}>
      {children}
    </h2>
  );
}
