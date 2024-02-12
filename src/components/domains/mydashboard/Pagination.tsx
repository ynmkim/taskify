import { cn } from '@/libs/utils';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';

interface PaginationProps {
  className?: string;
  totalPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({ className, totalPage, currentPage, setCurrentPage, ...props }: PaginationProps) {
  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPage));
  };

  return (
    <nav className={cn('flex items-center gap-3 md:gap-4', className)} {...props}>
      <span className="text-xs md:text-sm text-black-333236">
        {totalPage} 페이지 중 {currentPage}
      </span>
      <ul className="flex">
        <li>
          <button
            className="flex justify-center items-center w-9 h-9 md:w-10 md:h-10 rounded-l border border-gray-D9D9D9 bg-white cursor-pointer"
            onClick={handlePrevClick}
            disabled={currentPage === 1}
          >
            <IoIosArrowBack aria-label="이전" className="w-4 h-4 text-black-333236 disabled:text-gray-D9D9D9" />
          </button>
        </li>
        <li>
          <button
            className="flex justify-center items-center w-9 h-9 md:w-10 md:h-10 rounded-r border border-gray-D9D9D9 bg-white cursor-pointer"
            onClick={handleNextClick}
            disabled={currentPage === totalPage}
          >
            <IoIosArrowForward aria-label="다음" className="w-4 h-4 text-black-333236 disabled:text-gray-D9D9D9" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
