import React, { useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { Button } from '../ui/button';
import { Avatar } from '@/components/ui/avatar';

interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

interface MembersProps {
  members: Member[];
  className?: string;
}

const Members: React.FC<MembersProps> = ({ members }) => {
  const membersPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * membersPerPage;
  const endIndex = startIndex + membersPerPage;
  const currentMembers = members.slice(startIndex, endIndex);

  const totalPages = Math.ceil(members.length / membersPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className={'bg-white pt-[24px] lg:pt-[32px] md:pt-[32px] px-[20px] lg:px-[28px] md:px-[20px] pb-[19px] lg:pb-[28px] md:pb-[28px] rounded-md shadow-md w-[100%] h-[404px]'}>
      <div className="h-[24px] flex flex-row justify-between items-middle">
        <h2 className="text-xl font-bold mb-[37px]">구성원</h2>
        <div className="flex items-center">
          <span className="text-[#333236] lg:text-sm md:text-sm text-xs lg:mr-[16px] md:mr-[16px] mr-[12px]">
          {totalPages} 페이지 중 {currentPage}
          </span>
          <button className='text-[#D9D9D9] border border-gray-D9D9D9 lg:w-[40px] md:w-[40px] w-[36px] lg:h-[40px] md:h-[40px] h-[36px] inline-flex items-center justify-center rounded-md rounded-br-none rounded-tr-none' onClick={handlePrevPage}>
            <IoIosArrowBack size={20} />
          </button>
          <button className='text-[#D9D9D9] border border-gray-D9D9D9 lg:w-[40px] md:w-[40px] w-[36px] lg:h-[40px] md:h-[40px] h-[36px] inline-flex items-center justify-center rounded-md rounded-bl-none rounded-tl-none' onClick={handleNextPage}>
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </div>
      <div>
        <p className='mb-[24px] mt-[32.5px] font-normal text-base text-[#9FA6B2]'>이름</p>
        <div>
          {currentMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between mb-[32px]">
              <div className='flex flex-row gap-[12px] items-center'>
                <Avatar nickname={member.nickname} profileImageUrl={member.profileImageUrl} size='lg' />
                {member.nickname}
              </div>
              <Button className='w-[84px] h-[32px]'>삭제</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Members;
