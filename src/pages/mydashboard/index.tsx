import { GetServerSideProps, InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { parse } from 'cookie';
import { instance } from '@/libs/axios';
import { INVITATION_URL } from '@/constants/apiUrl';
import InvitedCard from '@/components/domains/mydashboard/InvitedCard';
import DashboardList from '@/components/domains/mydashboard/DashboardList';
import Pagination from '@/components/domains/mydashboard/Pagination';
// import CreateDashboardModal from '@/components/domains/mydashboard/CreateDashboardModal';
import DashboardHeader from '@/components/header/dashboardHeader';
import SideBar from '@/components/domains/dashboard/sidebar/SideBar';

export default function MyDashboardPage({ invitationData }: InferGetServerSidePropsType<GetServerSideProps>) {
  // console.log('=== Initial Data ===', 'invitations', invitationData.invitations, 'cursor:', invitationData.cursorId);
  return (
    <div className="flex w-screen bg-gray-FAFAFA">
      <SideBar />
      <div className="flex flex-col w-full">
        <DashboardHeader columnName="내 대시보드" type="myDashboard" />
        <main className="grow p-6 md:p-10">
          <div className="flex flex-col items-end max-w-[1022px] mb-6 sm:mb-10 md:mb-11 ">
            <DashboardList className="w-full max-w-[1022px] mb-2 sm:mb-2" />
            <Pagination />
          </div>
          <InvitedCard {...invitationData} />
          {/* <CreateDashboardModal /> */}
        </main>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const cookies = parse(req.headers.cookie || '');
  const accessToken = cookies.accessToken;

  try {
    const response = await instance.get(INVITATION_URL + '?size=5', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const invitationData = response.data;

    return {
      props: { invitationData },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      const errorMessage = error.response?.data.message;
      throw new Error(errorMessage);
    }
  }
}
