import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import GroupAvatar from '@/components/ui/avatarGroup';
import crownIcon from '../../../public/assets/icons/crown.svg';
import settingsIcon from '../../../public/assets/icons/settings.svg';
import addBoxIcon from '../../../public/assets/icons/add_box.svg';


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
    nickname: 'KimDongbin',
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
    nickname: 'dongbin',
    profileImageUrl: '',
    createdAt: '2024-01-25T10:21:46.244Z',
    updatedAt: '2024-01-25T10:21:46.244Z',
    isOwner: false,
  }
];

const Header:React.FC = () => {
  const totalCount = members.length;

  return (
    <header>
      <div className="container flex items-center w-[1620px]">
        <div className="flex flex-row align-middle font-bold text-xl gap-2">
          비브리지 <Image src={crownIcon} alt="crown" width={20} height={20} />
        </div>
        <nav className="space-x-4">
          <Button>
            <Image src={settingsIcon} alt="settings" width={16} height={16} /> 관리
          </Button>
          <Button>
            <Image src={addBoxIcon} alt="add_box" width={16} height={16} /> 초대하기
          </Button>
        </nav>
        <GroupAvatar members={members} totalCount={totalCount} />
        <Avatar {...userData} />
      </div>
    </header>
  );
};

export default Header;