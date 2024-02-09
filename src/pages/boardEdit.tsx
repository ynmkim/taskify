import React from 'react';
import Link from 'next/link'
import DashboardName from '@/components/boardEdit/dashboardName';
import Members from '@/components/boardEdit/members';
import Invited from '@/components/boardEdit/invited';
import { Button } from '@/components/ui/button';
import SideBar from '@/components/domains/dashboard/sidebar/SideBar';
import DashboardHeader from '@/components/header/dashboardHeader';

import { IoIosArrowBack } from 'react-icons/io';
import { useDashboard } from '@/contexts/useDashboard';

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


const BoardEdit: React.FC = () => {
  const { dashboards } = useDashboard();

  return (
    <div className='flex flex-row'> 
      <SideBar dashboards={dashboards}/>
      <div className='w-[100%]'>
        <DashboardHeader dashboardName='비브리지' type='' />
        <div className='flex flex-col gap-[40px] mx-[20px] w-[284px] md:w-[554px] lg:w-[620px]'>
          <div className='flex flex-col gap-[25px]'>
            <Link href='#' className='flex flex-fow items-center text-base font-medium mt-[20px] gap-[6px]'>
              <IoIosArrowBack size={20} />
              돌아가기
            </Link>
            <DashboardName title='비브리지' />
            <Members members={apiResponse.members} />
            <Invited members={apiResponse.members} />
          </div>
          <Button className='bg-[#fafafa] text-[#333236] border-[#d9d9d9] w-[284px] lg:w-[320px] md:w-[320px] h-[62px] px-[95px] py-[20px] my-[40px] font-medium text-lg'>대시보드 삭제하기</Button>
        </div>
      </div>
    </div>  
  );
};

export default BoardEdit;
