import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import GroupAvatar from '@/components/ui/avatarGroup';
import crownIcon from '../../../public/assets/icons/crown.svg';
import settingsIcon from '../../../public/assets/icons/settings.svg';
import addBoxIcon from '../../../public/assets/icons/add_box.svg';
import vector from '../../../public/assets/icons/vector.svg';


// 나중에 api연동하면 삭제될 임시 데이터입니다.
const userData = {
  nickname: 'dongbin',
  profileImageUrl: '',
};

const members = [
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
    email: 'example3@example.com',
    nickname: 'lauren',
    profileImageUrl: '',
    createdAt: '2024-01-25T10:21:46.244Z',
    updatedAt: '2024-01-25T10:21:46.244Z',
    isOwner: false,
  }, {
    id: 5,
    userId: 5,
    email: 'example3@example.com',
    nickname: 'Kimdongbin',
    profileImageUrl: '',
    createdAt: '2024-01-25T10:21:46.244Z',
    updatedAt: '2024-01-25T10:21:46.244Z',
    isOwner: false,
  }
];


const Header: React.FC<{ columnName: string, type?: string }> = ({ columnName, type }) => {
  const isDashboard = type === 'myDashboard';
  const totalCount = members.length;

  const getTitle = () => (isDashboard ? '내 대시보드' : columnName);

  return (
    <header className='w-[1350px] float-right mr-[80px]'>
      <div className="flex flex-row items-center justify-between h-[70px]">
        <div className="flex items-center font-bold text-xl gap-2 ml-[40px]">
          {getTitle()}
          {!isDashboard && <Image src={crownIcon} alt="crown" width={20} height={20} />}
        </div>
        <div className='flex flex-row items-center'>
          {!isDashboard && (
            <nav className="flex flex-row items-center gap-4 mr-[40px]">
              <Button className='text-gray-787486 flex align-middle gap-2 w-[88px]'>
                <Image src={settingsIcon} alt="settings" width={20} height={20} /> 관리
              </Button>
              <Button className='text-gray-787486 flex align-middle gap-2 w-[116px]'>
                <Image src={addBoxIcon} alt="add_box" width={20} height={20} /> 초대하기
              </Button>
            </nav>
          )}
          {!isDashboard && (
            <>
              <GroupAvatar members={members} totalCount={totalCount} />
              <Image src={vector} alt="vector" width={0} height={29} className='mx-[32px]' />
            </>
          )}
          <Avatar {...userData} />
          <span className="ml-[12px] font-medium text-base">{userData.nickname}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;