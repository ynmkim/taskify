import DashboardHeader from '@/components/header/dashboardHeader';
import Card from '@/components/common/Card';
import CardTitle from '@/components/common/CardTitle';
import ProfileForm from '@/components/domains/mypage/ProfileForm';
import PasswordForm from '@/components/domains/mypage/PasswordForm';
import { AuthProvider } from '@/contexts/AuthProvider';
import { useRouter } from 'next/router';
import { IoIosArrowBack } from 'react-icons/io';
import { ReactElement } from 'react';
import Layout from '@/components/domains/dashboard/layout';

export default function MyPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <AuthProvider>
      <div className="flex w-screen bg-gray-FAFAFA">
        <DashboardHeader dashboardName="내 대시보드" type="myDashboard" dashboardid={0}/>
        <main className="grow p-6 md:p-10">
          <button type="button" onClick={handleGoBack} className="flex items-center mb-5 md:mb-6">
            <IoIosArrowBack className="w-[18px] h-[18px] md:w-5 md:h-5" />
            뒤로 가기
          </button>
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
    </AuthProvider>
  );
}
// 확인용 주석
MyPage.getLayout = function getLayout(page:ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
