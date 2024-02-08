import { cn } from '@/libs/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export default function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={cn('pt-6 pb-5 px-4 md:pt-8 md:pb-7 md:px-7 rounded-lg bg-white', className)} {...props}>
      {children}
    </div>
  );
}
