import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import DashboardName from '@/components/boardEdit/dashboardName';
import Members from '@/components/boardEdit/members';
import Invited from '@/components/boardEdit/invited';
import { Button } from '@/components/ui/button';
import SideBar from '@/components/domains/dashboard/sidebar/SideBar';
import DashboardHeader from '@/components/header/dashboardHeader';

import { IoIosArrowBack } from 'react-icons/io';
/*
const apiResponse = {
  members: [
    {
      id: 1,
      userId: 1,
      email: 'example1@example.com',
      nickname: 'KimDongbin',
      profileImageUrl: '',
      createdAt: '2024-01-25T10:21:46.244Z',
      updatedAt: '2024-01-25T10:21:46.244Z',
      isOwner: false,
    }, {
      id: 2,
      userId: 2,
      email: 'example2@example.com',
      nickname: '김동빈',
      profileImageUrl: '',
      createdAt: '2024-01-25T10:21:46.244Z',
      updatedAt: '2024-01-25T10:21:46.244Z',
      isOwner: false,
    }, {
      id: 3,
      userId: 3,
      email: 'example3@example.com',
      nickname: 'dongbin',
      profileImageUrl: '',
      createdAt: '2024-01-25T10:21:46.244Z',
      updatedAt: '2024-01-25T10:21:46.244Z',
      isOwner: false,
    }, {
      id: 4,
      userId: 4,
      email: 'example4@example.com',
      nickname: 'lauren',
      profileImageUrl: '',
      createdAt: '2024-01-25T10:21:46.244Z',
      updatedAt: '2024-01-25T10:21:46.244Z',
      isOwner: false,
    }, {
      id: 5,
      userId: 5,
      email: 'example5@example.com',
      nickname: 'Kimdongbin',
      profileImageUrl: '',
      createdAt: '2024-01-25T10:21:46.244Z',
      updatedAt: '2024-01-25T10:21:46.244Z',
      isOwner: false,
    }, {
      id: 6,
      userId: 6,
      email: 'example6@example.com',
      nickname: 'abcd',
      profileImageUrl: '',
      createdAt: '2024-01-25T10:21:46.244Z',
      updatedAt: '2024-01-25T10:21:46.244Z',
      isOwner: false,
    }
  ],
  totalCount: 6,
};
*/

const BoardEdit: React.FC = () => {
  const router = useRouter();
  const { dashboardid } = router.query;

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`https://sp-taskify-api.vercel.app/2-10/members?page=1&size=20&dashboardId=${dashboardid}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }

        const data = await response.json();
        setMembers(data.members);
      } catch (error) {
        alert(`Error fetching members: ${(error as Error).message}`);
      }
    };

    if (dashboardid) {
      fetchMembers();
    }
  }, [dashboardid]);

  const handleDeleteMember = (memberId: number) => {
    console.log(`Deleting member with ID: ${memberId}`);
  };

  return (
    <div className='flex flex-row'> 
      <SideBar />
      <div className='w-[100%]'>
        <DashboardHeader columnName='비브리지' type='' />
        <div className='flex flex-col gap-[40px] mx-[20px] w-[284px] md:w-[554px] lg:w-[620px]'>
          <div className='flex flex-col gap-[25px]'>
            <Link href={`/dashboard/[dashboardid]`} as={`/dashboard/${dashboardid}`} className='flex flex-fow items-center text-base font-medium mt-[20px] gap-[6px]'>
              <IoIosArrowBack size={20} />
              돌아가기
            </Link>
            <DashboardName title='비브리지' />
            <Members members={members} />
            <Invited dashboardId={dashboardid} members={members} />
          </div>
          <Button className='bg-[#fafafa] text-[#333236] border-[#d9d9d9] w-[284px] lg:w-[320px] md:w-[320px] h-[62px] px-[95px] py-[20px] my-[40px] font-medium text-lg'>대시보드 삭제하기</Button>
        </div>
      </div>
    </div>  
  );
};

export default BoardEdit;
