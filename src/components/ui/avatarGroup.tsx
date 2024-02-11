import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { axiosAuthInstance } from '@/libs/axios';

interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

interface GroupAvatarProps {
  dashboardid: string | string[] | number | undefined; 
}

const authInstance = axiosAuthInstance();

const GroupAvatar: React.FC<GroupAvatarProps> = ({ dashboardid }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const colors = ['bg-orange-ffc85a', 'bg-yellow-fdd446', 'bg-blue-9dd7ed', 'bg-brown-c4b1a2', 'bg-green-a3c4a2'];

  useEffect(() => {
    if(dashboardid) {
      const fetchData = async () => {
        try {
          const response = await authInstance.get(`members?page=1&size=20&dashboardId=${dashboardid}`);
          const data = await response.data;
          setMembers(data.members);
          setTotalCount(data.totalCount);
        } catch (error) {
          alert('Error fetching data:' + (error as Error).message);
        }
      };
  
      fetchData();
    }
  }, [dashboardid]);


  return (
    <>
      <div className="hidden lg:flex space-x-[-0.6rem]">
        {members.slice(0, 4).map((member, index) => (
        <div key={member.id} className="relative">
          {member.profileImageUrl ? (
            <Image
              src={member.profileImageUrl}
              alt={`Avatar ${member.id}`}
              className="rounded-full w-10 h-10 border-2 border-white"
              width={10}
              height={10}
            />
          ) : (
            <div className={`rounded-full w-10 h-10 border-2 border-white ${colors[index % colors.length]} flex items-center justify-center text-white`}>
              {member.nickname.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      ))}
      {totalCount > 4 && (
        <div className="relative">
          <div className={`rounded-full w-10 h-10 border-2 border-white bg-pink-f4d7da flex items-center justify-center text-[#d25b68]`}>
            +{totalCount - 4}
          </div>
        </div>
      )}
    </div>
    <div className="flex lg:hidden space-x-[-0.6rem]">
      {members.slice(0, 2).map((member, index) => (
        <div key={member.id} className="relative">
          {member.profileImageUrl ? (
            <Image
              src={member.profileImageUrl}
              alt={`Avatar ${member.id}`}
              className="rounded-full w-10 h-10 border-2 border-white"
              width={10}
              height={10}
            />
          ) : (
            <div className={`rounded-full w-10 h-10 border-2 border-white ${colors[index % colors.length]} flex items-center justify-center text-white`}>
              {member.nickname.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      ))}
      {totalCount > 2 && (
        <div className="relative">
          <div className={`rounded-full w-10 h-10 border-2 border-white bg-pink-f4d7da flex items-center justify-center text-[#d25b68]`}>
            +{totalCount - 2}
          </div>
        </div>
      )}
      </div>
    </>
    
  );
};

export default GroupAvatar;
