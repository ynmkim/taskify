import ProfileCard from '@/components/domains/mypage/ProfileCard';
import ChangePasswordCard from '@/components/domains/mypage/ChangePasswordCard ';

export default function MyPage() {
  return (
    <div className="w-screen h-screen p-6 md:p-10 bg-gray-FAFAFA">
      <ProfileCard className="mb-4" />
      <ChangePasswordCard />
    </div>
  );
}
