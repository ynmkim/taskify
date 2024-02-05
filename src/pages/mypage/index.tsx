import DashboardHeader from '@/components/header/dashboardHeader';
import SideBar from '@/components/domains/dashboard/sidebar/SideBar';
import CardTitle from '@/components/common/CardTitle';
import ProfileForm from '@/components/domains/mypage/ProfileForm';
import PasswordForm from '@/components/domains/mypage/PasswordForm';
import { cn } from '@/libs/utils';

export default function MyPage() {
  interface CardProps {
    className?: string;
    children: React.ReactNode;
  }

  function Card({ className, children, ...props }: CardProps) {
    return (
      <div className={cn('pt-6 pb-5 px-4 md:pt-8 md:pb-7 md:px-7 rounded-lg bg-white', className)} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div className="flex w-screen bg-gray-FAFAFA">
      <SideBar />
      <div className="flex flex-col w-full">
        <DashboardHeader columnName="내 대시보드" type="myDashboard" />
        <main className="grow p-6 md:p-10">
          <Card className="md:max-w-[620px] mb-3">
            <CardTitle className="mb-6 md:mb-8">프로필</CardTitle>
            <ProfileForm />
          </Card>
          <Card className="md:max-w-[620px]">
            <CardTitle className="mb-6 md:mb-8">비밀번호 변경</CardTitle>
            <PasswordForm />
          </Card>
        </main>
      </div>
    </div>
  );
}
