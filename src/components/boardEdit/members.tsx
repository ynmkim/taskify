import React, { useState, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { Button } from '../ui/button';
import { Avatar } from '@/components/ui/avatar';
import { axiosAuthInstance } from '@/libs/axios';

interface MembersProps {
  className?: string;
  dashboardid: string | string[] | number | undefined;
}

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

const authInstance = axiosAuthInstance();

const Members: React.FC<MembersProps> = ({ dashboardid }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const membersPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (dashboardid) {
      const fetchMembers = async () => {
        try {
          const response = await authInstance.get(`members?page=1&size=20&dashboardId=${dashboardid}`);
          const data = await response.data;
          setMembers(data.members);
        } catch (error) {
          alert(`Error fetching members: ${(error as Error).message}`);
        }
      };
  
      fetchMembers();
    }
  }, [dashboardid]);

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

  const handleDeleteMember = async (memberId: number, isOwner: boolean) => {
    try {
      if (isOwner) {
        alert('삭제할 수 없는 구성원입니다.');
        return;
      }

      await authInstance.delete(`members/${memberId}`);
      const updatedMembers = members.filter((member) => member.id !== memberId);
      setMembers(updatedMembers);
    } catch (error) {
      alert(`Error deleting member: ${(error as Error).message}`);
    }
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
              <Avatar user={member} size='lg' />
                {member.nickname}
              </div>
              <Button className='w-[52px] lg:w-[84px] md:w-[84px] h-[32px] px-[7px] py-[10px]' onClick={() => handleDeleteMember(member.id, member.isOwner)}>삭제</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Members;
