import * as React from 'react';
import { cn } from '@/libs/utils';
import Image from 'next/image';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(({ className, ...props }, ref) => {
  return (
    <div className={cn('relative h-10', className)}>
      <div className="absolute top-1/2 left-3 md:left-4 -translate-y-1/2 w-[22px] h-[22px] md:w-6 md:h-6">
        <Image fill src="/search.svg" alt="" className="object-cover" />
      </div>
      <input
        type="text"
        className={cn(
          'w-full h-full py-[7px] md:py-2 pr-3 md:pr-4 pl-11 md:pl-12 rounded-md border border-gray-D9D9D9 text-sm md:text-base text-gray-9FA6B2 placeholder:text-gray-9FA6B2 disabled:cursor-not-allowed',
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export { SearchInput };
