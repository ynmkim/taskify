import React, { useEffect, useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { Button } from '../ui/button';
import { axiosAuthInstance } from '@/libs/axios';
import InvitationDialog from '../dialog/InvitationDialog';


interface InvitedProps {
  className?: string;
  dashboardid: number;
}

interface InvitationsResponse {
  totalCount: number;
  invitations: Invitation[];
}

interface Invitation {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

const authInstance = axiosAuthInstance();


const Invited: React.FC<InvitedProps> = ({ dashboardid }) => {
  const membersPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const startIndex = (currentPage - 1) * membersPerPage;
  const endIndex = startIndex + membersPerPage;
  const currentInvitations = invitations.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const fetchData = async () => {
    try {
      if (dashboardid) {
        const response = await authInstance.get(`dashboards/${dashboardid}/invitations?page=${currentPage}&size=${membersPerPage}`);
        const responseData: InvitationsResponse = await response.data;
        setInvitations(responseData.invitations);
        setTotalPages(Math.ceil(responseData.totalCount / membersPerPage));
        localStorage.setItem('invitations', JSON.stringify(responseData.invitations));
      }
    } catch (error) {
      alert('초대 정보를 불러오는 중 오류가 발생했습니다: ' + (error as Error).message);
    }
  };

  useEffect(() => {
    const storedInvitations = localStorage.getItem('invitations');
    if (storedInvitations) {
      setInvitations(JSON.parse(storedInvitations));
    }

    fetchData();
  }, [currentPage, dashboardid]);

  const handleInviteSuccess = () => {
    fetchData();
  };

  const handleCancelInvitation = async (invitationId: number) => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const currentUserId = userData.id;

      const invitation = invitations.find(invitation => invitation.id === invitationId);
      if (invitation) {
        if (invitation.inviter.id === currentUserId) {
          await authInstance.delete(`dashboards/${dashboardid}/invitations/${invitationId}`);
          const updatedInvitations = invitations.filter(invitation => invitation.id !== invitationId);
          setInvitations(updatedInvitations);
          alert('초대를 취소했습니다.');
        } else {
          alert('취소 권한이 없습니다.');
        }
      } else {
        alert('초대를 찾을 수 없습니다.');
      }
    } catch (error) {
      alert('초대를 취소하는 데 오류가 발생했습니다: ' + (error as Error).message);
    }
  };
  
  return (
    <div className="bg-white pt-[24px] lg:pt-[32px] md:pt-[32px] px-[20px] lg:px-[28px] md:px-[20px] pb-[19px] lg:pb-[28px] md:pb-[28px] rounded-md shadow-md w-[100%] h-[404px]">
      <div className="h-[24px] flex flex-row justify-between items-center">
        <div className="text-[19px] lg:text-xl md:text-xl font-bold lg:mb-[37px] md:mb-[37px] lg:mt-[34px] md:mt-[34px]">초대 내역</div>
        <div className="flex items-center flex-col gap-[25px] lg:gap-[0px] md:gap-[0px] lg:flex-row md:flex-row mt-[50px] lg:mt-[0px] md:mt-[0px]">
          <div className='flex flex-row items-center'>
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
          <div>
            <InvitationDialog dashboardid={dashboardid} onInviteSuccess={handleInviteSuccess} />
          </div>
        </div>
      </div>
      <div>
        <p className='mb-[24px] mt-[32.5px] font-normal text-base text-[#9FA6B2]'>이메일</p>
        <div>
          {currentInvitations.map((invitation) => (
            <div key={invitation.id} className="flex items-center justify-between mb-[32px]">
              <div className='flex flex-row gap-[12px] items-center text-[14px] lg:text-[16px] md:text-[16px]'>
                {invitation.invitee.email}
              </div>
              <Button
                className='w-[50px] px-[10px] lg:px-[37px] md:px-[37px] lg:w-[84px] md:w-[84px] h-[32px]' onClick={() => handleCancelInvitation(invitation.id)}
              >
                취소
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Invited;
