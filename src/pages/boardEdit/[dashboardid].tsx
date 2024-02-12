import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import DashboardName from '@/components/boardEdit/dashboardName';
import Members from '@/components/boardEdit/members';
import Invited from '@/components/boardEdit/invited';
import { Button } from '@/components/ui/button';
import SideBar from '@/components/domains/dashboard/sidebar/SideBar';
import DashboardHeader from '@/components/modal/dashboardHeader';
import { IoIosArrowBack } from 'react-icons/io';

const BoardEdit: React.FC = () => {
  const router = useRouter();
  const { dashboardid } = router.query;

  return (
    <div className='flex flex-row'>
      <SideBar />
      <div className='w-[100%]'>
        <DashboardHeader type='' dashboardid={dashboardid} />
        <div className='flex flex-col gap-[40px] mx-[20px] w-[284px] md:w-[554px] lg:w-[620px]'>
          <div className='flex flex-col gap-[25px]'>
            <Link href={`/dashboard/[dashboardid]`} as={`/dashboard/${dashboardid}`} className='flex flex-fow items-center text-base font-medium mt-[20px] gap-[6px]'>
              <IoIosArrowBack size={20} width={5} />
              돌아가기
            </Link>
            <DashboardName dashboardid={dashboardid} />
            <Members dashboardid={dashboardid} />
            <Invited dashboardid={dashboardid} />
          </div>
          <Button className='bg-[#fafafa] text-[#333236] border-[#d9d9d9] w-[284px] lg:w-[320px] md:w-[320px] h-[62px] px-[95px] py-[20px] my-[40px] font-medium text-lg'>대시보드 삭제하기</Button>
        </div>
      </div>
    </div>  
  );
};

export default BoardEdit;
