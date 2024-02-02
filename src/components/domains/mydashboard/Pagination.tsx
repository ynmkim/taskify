import Image from 'next/image';
import { cn } from '@/libs/utils';

interface PaginationProps {
  className?: string;
}

export default function Pagination({ className, ...props }: PaginationProps) {
  return (
    <nav className={cn('flex items-center gap-3 md:gap-4', className)} {...props}>
      <span className="text-xs md:text-sm text-black-333236">1 페이지 중 1</span>
      <ul className="flex">
        <li>
          <button className="flex justify-center items-center w-9 h-9 md:w-10 md:h-10 rounded-l border border-gray-D9D9D9 bg-white">
            <Image src="/arrow_previous.svg" alt="이전" width={16} height={16} />
          </button>
        </li>
        <li>
          <button className="flex justify-center items-center w-9 h-9 md:w-10 md:h-10 rounded-r border border-gray-D9D9D9 bg-white">
            <Image src="/arrow_next.svg" alt="다음" width={16} height={16} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
