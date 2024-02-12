import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import GroupAvatar from '@/components/ui/avatarGroup';
import { FaCrown } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { FaRegSquarePlus } from "react-icons/fa6";
import { Member } from '@/types/DashboardType';
import Link from 'next/link';
import { axiosAuthInstance } from '@/libs/axios';
import ColumnModal from '../modal/ColumnModal';
import useStore from '@/state/dashboardTitleState';
import InvitationDialog from '../dialog/InvitationDialog';

// interface DashboardHeaderProps {
//   type?: string;
//   dashboardid?: string | string[] | number | undefined; 
// }

// interface SlotSectionProps {
//   dashboardid?: string | string[] | number | undefined; 
// }

const authInstance = axiosAuthInstance();

const SlotSection = ({dashboardid, createdByMe}:{dashboardid:number, createdByMe?:boolean}) =>{
  const [members, setMembers] = useState<Member[]>([]);
  // const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // const openInviteModal = () => {
  //   setIsInviteModalOpen(true);
  // };
  
  // const closeInviteModal = () => {
  //   setIsInviteModalOpen(false);
  // };
  
  useEffect(() => {
    if (dashboardid) {
      const fetchMembers = async () => {
        try {
          const response = await authInstance.get(`members?page=1&size=20&dashboardId=${dashboardid}`);
          const data = response.data;
          setMembers(data.members);
        } catch (error) {
          alert('Error fetching members data: ' + (error as Error).message);
        }
      };
  
      fetchMembers();
    }
  }, [dashboardid]);

  return(
    <>
      <nav className="flex flex-row items-center gap-4 mr-10">
        {
          createdByMe && 
            <Link href={`/dashboard/${dashboardid}/edit`}>
              <Button className='text-gray-787486 flex align-middle gap-2 w-[50px] lg:w-[88px] md:w-[88px]'>
                <span><MdOutlineSettings className="w-0 lg:w-5 md:w-5 h-5" /></span><span>관리</span>
              </Button>
            </Link>
        }
        <InvitationDialog dashboardid={dashboardid}/>
        {/* <Button className='text-gray-787486 flex align-middle gap-2 w-[96px] lg:w-[116px] md:w-[116px]'>
          <span><FaRegSquarePlus className="w-0 lg:w-5 md:w-5 h-5" /></span><span>초대하기</span>
        </Button> */}
      </nav>
      <GroupAvatar dashboardid={dashboardid} />
      <div className='w-[1px] h-[38px] mx-8 bg-[#d9d9d9]'/>
      {/* <ColumnModal
        isOpen={isInviteModalOpen}
        onClose={closeInviteModal}
        title="초대하기"
        label="이메일"
        placeholder="codeit@codeit.com"
        confirmButtonText="초대"
        modalType="invite"
        onConfirm={handleConfirmFunction}
      /> */}
    </>
  )
};

const DashboardHeader: React.FC<{ dashboardName: string, type?: string, createdByMe?:boolean, dashboardid:number }> = ({ dashboardName, type, createdByMe, dashboardid }) => {
  const isDashboard = type === 'myDashboard';
  const [userData, setUserData] = useState<{ nickname: string }>({ nickname: '' });
  // const dashboardTitle = useStore(state => state.dashboardTitle);
  // const setDashboardTitle = useStore(state => state.setDashboardTitle);;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await authInstance.get('users/me');
        const data = await response.data;
        setUserData(data);
      } catch (error) {
        alert('Error fetching user data: ' + (error as Error).message);
      }
    };
  
    fetchUserData();
  }, []);

  // useEffect(() => {
  //   if (dashboardid) {
  //     const fetchDashboardData = async () => {
  //       try {
  //         const response = await authInstance.get(`dashboards/${dashboardid}`);
  //         const data = await response.data;
  //         setDashboardTitle(data.title);
  //       } catch (error) {
  //         alert('Error fetching dashboard data: ' + (error as Error).message);
  //       }
  //     };
  
  //     fetchDashboardData();
  //   }
  // }, [dashboardid]);

  const getTitle = () => (isDashboard ? '내 대시보드' : dashboardName);

  return (
    <header className='w-full h-[70px] pl-10 pr-5 lg:pr-20 md:pr-10 bg-white border-b border-gray-D9D9D9'>
      <div className="flex flex-row items-center justify-between h-[70px]">
      {isDashboard && <div className="flex items-center font-bold text-xl gap-2">{getTitle()}</div>}
        {!isDashboard &&
          <div className="hidden lg:flex items-center font-bold text-xl gap-2 lg:w-[98px]">
            {getTitle()}
            {createdByMe && <FaCrown className="w-5 h-4" fill="#FDD446"/>}
          </div>
        }
        <div className='flex flex-row items-center'>
          {!isDashboard && <SlotSection dashboardid={dashboardid} createdByMe={createdByMe}/>}
          <Avatar size='lg' {...userData} />
          <span className="invisible lg:visible md:visible ml-3 font-medium text-base">{userData.nickname}</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
